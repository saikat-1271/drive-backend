CREATE OR REPLACE FUNCTION save_document_revision(
    p_docname VARCHAR,
    p_folderid INT,
    p_s3filename VARCHAR,
    p_fileext VARCHAR,
    p_filesize BIGINT,
    p_userid INT,
    p_searchtag VARCHAR DEFAULT NULL,
    p_extradata JSONB DEFAULT NULL
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    v_docid INT;
    v_new_revid INT;
    v_revision_number INT;
BEGIN
    -- 1️⃣ Check if document exists
    SELECT docid
    INTO v_docid
    FROM dr_documents
    WHERE docname = p_docname
      AND isdelete = false
    LIMIT 1;

    IF v_docid IS NOT NULL THEN
        -- Existing document → increment revision
        SELECT COALESCE(MAX(revisionnumber), 0) + 1
        INTO v_revision_number
        FROM dr_documentsrevision
        WHERE docid = v_docid;

    ELSE
        -- New document
        INSERT INTO dr_documents(
            docname,
            folderid,
            lastrevid,
            createdy,
            modifyby,
            searchtag,
            extradata
        )
        VALUES (
            p_docname,
            p_folderid,
            0, -- temp
            p_userid,
            p_userid,
            p_searchtag,
            p_extradata
        )
        RETURNING docid INTO v_docid;

        v_revision_number := 1;
    END IF;

    -- 2️⃣ Insert revision
    INSERT INTO dr_documentsrevision(
        docid,
        s3filename,
        fileext,
        filesize,
        createdy,
        modifyby,
        revisionnumber,
        extradata
    )
    VALUES (
        v_docid,
        p_s3filename,
        p_fileext,
        p_filesize,
        p_userid,
        p_userid,
        v_revision_number,
        p_extradata
    )
    RETURNING docrevid INTO v_new_revid;

    -- 3️⃣ Update document with latest revision id
    UPDATE dr_documents
    SET lastrevid = v_new_revid,
        modifyby = p_userid,
        modifydate = NOW()
    WHERE docid = v_docid;

    RETURN v_new_revid;
END;
$$;
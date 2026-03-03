import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { CreateDocumentRevisionDto } from './dto/create-document-revision.dto';
import { DocumentListQueryDto, SortField } from './dto/document-list-query.dto';
import {
  PaginatedDocumentListDto,
  DocumentListItemDto,
} from './dto/document-list-response.dto';
import { DrDocuments } from './entities/dr-documents.entity';
import { DrDocumentsRevision } from './entities/dr-documentsrevision.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(DrDocuments)
    private documentsRepository: Repository<DrDocuments>,
    @InjectRepository(DrDocumentsRevision)
    private documentsRevisionRepository: Repository<DrDocumentsRevision>,
  ) {}

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }

  async saveDocumentRevision(dto: CreateDocumentRevisionDto): Promise<any> {
    const result = await this.documentsRepository.query(
      `SELECT save_document_revision(
        $1, $2, $3, $4, $5, $6, $7, $8
      ) AS result`,
      [
        dto.docname,
        dto.folderid,
        dto.s3filename,
        dto.fileext,
        dto.filesize,
        dto.userid,
        dto.searchtag || null,
        dto.extradata ? JSON.stringify(dto.extradata) : null,
      ],
    );
    return result[0]?.result;
  }

  async getDocumentList(
    query: DocumentListQueryDto,
  ): Promise<PaginatedDocumentListDto> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = SortField.MODIFYDATE,
      sortOrder = 'DESC',
      folderid,
    } = query;
    const skip = (page - 1) * limit;

    // Build the base query using QueryBuilder with raw SQL for the join
    const queryBuilder = this.documentsRepository
      .createQueryBuilder('doc')
      .innerJoin(
        'dr_documentsrevision',
        'rev',
        'rev.docid = doc.docid AND rev.docrevid = doc.lastrevid AND rev.isdelete = false',
      )
      .where('doc.isdelete = false');

    // Add folderid filter if provided
    if (folderid) {
      queryBuilder.andWhere('doc.folderid = :folderid', { folderid });
    }

    // Add search filter for docname
    if (search) {
      queryBuilder.andWhere('LOWER(doc.docname) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    // Get total count
    const total = await queryBuilder.getCount();

    // Map sort fields to database columns
    const sortFieldMap: Record<string, string> = {
      name: 'doc.docname',
      size: 'rev.filesize',
      createdate: 'doc.createdate',
      modifydate: 'doc.modifydate',
    };

    const orderByColumn = sortFieldMap[sortBy] || 'doc.modifydate';

    // Apply sorting and pagination
    queryBuilder
      .orderBy(orderByColumn, sortOrder as 'ASC' | 'DESC')
      .skip(skip)
      .take(limit);

    // Select specific columns using raw SQL aliases
    queryBuilder
      .select('doc.docid', 'docid')
      .addSelect('doc.docname', 'docname')
      .addSelect('rev.filesize', 'filesize')
      .addSelect('rev.s3filename', 's3filename')
      .addSelect('rev.fileext', 'fileext')
      .addSelect('doc.folderid', 'folderid')
      .addSelect('rev.docrevid', 'docrevid')
      .addSelect('rev.revisionnumber', 'revisionnumber')
      .addSelect('doc.createdate', 'createdate')
      .addSelect('doc.modifydate', 'modifydate');

    const results = await queryBuilder.getRawMany();

    // Transform results to match DTO
    const data: DocumentListItemDto[] = results.map((item) => ({
      docid: item.docid,
      docname: item.docname,
      filesize: Number(item.filesize) || 0,
      s3filename: item.s3filename || '',
      fileext: item.fileext || '',
      folderid: item.folderid,
      docrevid: item.docrevid,
      revisionnumber: item.revisionnumber || 1,
      createdate: item.createdate,
      modifydate: item.modifydate,
    }));

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

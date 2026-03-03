import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { CreateDocumentRevisionDto } from './dto/create-document-revision.dto';
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
}

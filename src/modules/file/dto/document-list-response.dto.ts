import { ApiProperty } from '@nestjs/swagger';

export class DocumentListItemDto {
  @ApiProperty({ description: 'Document ID' })
  docid: number;

  @ApiProperty({ description: 'Document name' })
  docname: string;

  @ApiProperty({ description: 'File size in bytes' })
  filesize: number;

  @ApiProperty({ description: 'Original filename from S3' })
  s3filename: string;

  @ApiProperty({ description: 'File extension' })
  fileext: string;

  @ApiProperty({ description: 'Folder ID' })
  folderid: number;

  @ApiProperty({ description: 'Document revision ID' })
  docrevid: number;

  @ApiProperty({ description: 'Revision number' })
  revisionnumber: number;

  @ApiProperty({ description: 'Created date' })
  createdate: Date;

  @ApiProperty({ description: 'Modified date' })
  modifydate: Date;
}

export class PaginatedDocumentListDto {
  @ApiProperty({ description: 'List of documents' })
  data: DocumentListItemDto[];

  @ApiProperty({ description: 'Total count' })
  total: number;

  @ApiProperty({ description: 'Current page' })
  page: number;

  @ApiProperty({ description: 'Items per page' })
  limit: number;

  @ApiProperty({ description: 'Total pages' })
  totalPages: number;
}

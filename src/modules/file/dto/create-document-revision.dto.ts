import { IsString, IsInt, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDocumentRevisionDto {
  @ApiProperty({ description: 'Document name', example: 'example.pdf' })
  @IsString()
  docname: string;

  @ApiProperty({ description: 'Folder ID', example: 1 })
  @IsInt()
  folderid: number;

  @ApiProperty({ description: 'S3 filename', example: 'uuid-filename' })
  @IsString()
  s3filename: string;

  @ApiProperty({ description: 'File extension', example: 'pdf' })
  @IsString()
  fileext: string;

  @ApiProperty({ description: 'File size in bytes', example: 1024000 })
  @IsInt()
  filesize: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  @IsInt()
  userid: number;

  @ApiPropertyOptional({
    description: 'Search tag',
    example: 'important document',
  })
  @IsOptional()
  @IsString()
  searchtag?: string;

  @ApiPropertyOptional({
    description: 'Extra data as JSON',
    example: { key: 'value' },
  })
  @IsOptional()
  @IsObject()
  extradata?: Record<string, any>;
}

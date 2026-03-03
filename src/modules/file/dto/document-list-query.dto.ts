import { IsOptional, IsInt, IsString, IsEnum, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum SortField {
  NAME = 'name',
  SIZE = 'size',
  CREATEDATE = 'createdate',
  MODIFYDATE = 'modifydate',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class DocumentListQueryDto {
  @ApiPropertyOptional({ description: 'Page number', example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Search by document name',
    example: 'report',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Sort field: name, size, createdate, modifydate',
    example: 'modifydate',
    default: 'modifydate',
  })
  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.MODIFYDATE;

  @ApiPropertyOptional({
    description: 'Sort order: ASC, DESC',
    example: 'DESC',
    default: 'DESC',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional({ description: 'Folder ID to filter by', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  folderid?: number;
}

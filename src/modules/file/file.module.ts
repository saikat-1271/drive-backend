import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DrDocuments } from './entities/dr-documents.entity';
import { DrDocumentsRevision } from './entities/dr-documentsrevision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrDocuments, DrDocumentsRevision])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}

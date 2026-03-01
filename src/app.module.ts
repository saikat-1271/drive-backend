import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { Sample } from './entities/folder.entity';
import { DrDocuments } from './entities/dr-documents.entity';
import { DrDocumentsRevision } from './entities/dr-documentsrevision.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Sample, DrDocuments, DrDocumentsRevision]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

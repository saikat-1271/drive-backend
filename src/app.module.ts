import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { Folder } from './entities/folder.entity';
import { DrDocuments } from './entities/dr-documents.entity';
import { DrDocumentsRevision } from './entities/dr-documentsrevision.entity';
import { ConfigModule } from './modules/config/config.module';
import { Config } from './entities/master-config.entity';
import { FolderHirerchy } from './entities/folderhirerchy.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([
      DrDocuments,
      DrDocumentsRevision,
      Config,
      Folder,
      FolderHirerchy,
    ]),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

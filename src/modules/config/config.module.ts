import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigRepository } from './config.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../../entities/master-config.entity';

@Module({
  controllers: [ConfigController],
  imports: [TypeOrmModule.forFeature([Config])],
  providers: [ConfigService, ConfigRepository],
})
export class configModule {}

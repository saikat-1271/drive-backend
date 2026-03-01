import { Injectable } from '@nestjs/common';
import { Config } from '../../entities/master-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectRepository(Config)
    private readonly ConfigRepo: Repository<Config>,
  ) {}
  async findAll(): Promise<Config[]> {
    try {
      return this.ConfigRepo.createQueryBuilder('c')
        .select(['c.configkey', 'c.configvalue'])
        .getMany();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

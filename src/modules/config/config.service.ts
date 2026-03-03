import { Injectable } from '@nestjs/common';
import { ConfigRepository } from './config.repository';
import { Config } from './entities/master-config.entity';
import { encrypt } from 'src/utils/utils';

@Injectable()
export class ConfigService {
  constructor(private readonly configRepository: ConfigRepository) {}

  async find(): Promise<string> {
    try {
      const res: Config[] = await this.configRepository.findAll();
      if (res.length == 0) {
        return '';
      }
      return encrypt(JSON.stringify(res));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

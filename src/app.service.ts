import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private ds: DatabaseService) {}
  
  async getHello() {
    let data = await this.ds.knex.from("db_migrations").select("*");
    return data;
  }
}

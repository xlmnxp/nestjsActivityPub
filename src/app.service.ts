import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private databaseService: DatabaseService) {}
  
  async getHello() {
    let data = await this.databaseService.knex.from("db_migrations").select("*");
    return data;
  }
}

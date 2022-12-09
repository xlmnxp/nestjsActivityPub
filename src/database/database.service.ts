import { Injectable } from '@nestjs/common';
import knex from 'knex';

@Injectable()
export class DatabaseService {
    public knex = knex({
        client: 'postgresql',
        connection: {
          host: '2a06:a005:857:dc01:e432:d88e:e5d8:4e2c',
          database: 'activitypub',
          user:     'activitypub',
          password: 'secure'
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'db_migrations'
        }
      })
}

import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ActivitiesModule } from 'src/activities/activities.module';

@Module({
  imports: [DatabaseModule, ActivitiesModule],
  controllers: [PersonsController],
  providers: [PersonsService]
})
export class PersonsModule {}

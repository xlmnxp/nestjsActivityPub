import { Injectable } from '@nestjs/common';
import { ActivitiesService } from 'src/activities/activities.service';
import { DatabaseService } from 'src/database/database.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(private readonly databaseService: DatabaseService, private readonly activitiesService: ActivitiesService) {}

  create(createPersonDto: any | CreatePersonDto) {
    return this.databaseService.knex("person").insert(createPersonDto).returning("*");
  }

  async getPerson(id: string) {
    let personData = await this.databaseService.knex("person").select("*").where("id", id).first();
    return personData ? {
      "@context": "https://www.w3.org/ns/activitystreams",
      ...personData
    } : null;
  }

  async getPersonOutbox(id: string) {
    return this.activitiesService.findAllForPerson(id);
  }

  async getPersonInbox(id: string) {
    return this.activitiesService.findAllForPersonInTo(id);
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}

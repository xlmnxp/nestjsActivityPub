import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly databaseService: DatabaseService) {}
  
  async create(createActivityDto: CreateActivityDto) {
    let activity = await this.databaseService.knex("activities").insert({
      actor: createActivityDto.actor,
      type: createActivityDto.type,
      payload: createActivityDto
    }).returning("*");
    return activity?.[0]|| null;
  }

  async findAll(type: string) {
    let activities: any[] = await this.databaseService.knex("activities").select([
      "id",
      "name",
      "type",
      "payload",
      this.databaseService.knex.raw(`json_build_object('type', 'Person', 'name', person.name) as actor`)
    ]).join("person", "activities.actor", "person.id");
    return activities.map(activity => ({
      "@context": "https://www.w3.org/ns/activitystreams",
      ...activity.payload,
      ...activity,
      payload: undefined
    }));
  }

  async findAllForPerson(id: string) {
    let activities: any[] = await this.databaseService.knex("activities").select([
      "id",
      "name",
      "type",
      "payload",
      this.databaseService.knex.raw(`json_build_object('type', 'Person', 'name', person.name) as actor`)
    ]).join("person", "activities.actor", "person.id").where("actor", id);
    return activities.map(activity => ({
      "@context": "https://www.w3.org/ns/activitystreams",
      ...activity.payload,
      ...activity,
      payload: undefined
    }));
  }

  async findAllForPersonInTo(id: string) {
    let activities: any[] = await this.databaseService.knex("activities").select([
      "id",
      "name",
      "type",
      "payload",
      this.databaseService.knex.raw(`json_build_object('type', 'Person', 'name', person.name) as actor`)
    ]).join("person", "activities.actor", "person.id").where(this.databaseService.knex.raw("payload::jsonb->'to'"), '?', id);
    return activities.map(activity => ({
      "@context": "https://www.w3.org/ns/activitystreams",
      ...activity.payload,
      ...activity,
      payload: undefined
    }));
  }

  async findOne(type: string, id: string) {
    let activity: any = await this.databaseService.knex("activities").select([
      "id",
      "name",
      "type",
      "payload",
      this.databaseService.knex.raw(`json_build_object('type', 'Person', 'name', person.name) as actor`)
    ]).join("person", "activities.actor", "person.id").where("aid", id).first();

    return {
      "@context": "https://www.w3.org/ns/activitystreams",
      ...activity.payload,
      ...activity,
      payload: undefined
    };
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}

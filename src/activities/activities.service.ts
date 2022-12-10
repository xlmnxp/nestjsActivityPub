import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly ds: DatabaseService) {}
  
  async create(createActivityDto: CreateActivityDto) {
    let activity = await this.ds.knex("activities").insert({
      actor: createActivityDto.actor,
      type: createActivityDto.type,
      payload: createActivityDto
    }).returning("*");
    return activity?.[0]|| null;
  }

  async findAll(type: string) {
    let activities: any[] = await this.ds.knex("activities").select([
      "id",
      "name",
      "type",
      "payload",
      this.ds.knex.raw(`json_build_object('type', 'User', 'name', user.name) as actor`)
    ]).join("users", "activities.actor", "user.id");
    return activities.map(activity => ({
      "@context": "https://www.w3.org/ns/activitystreams",
      id: `https://ap.sy.sa/${activity.type}/${activity.aid}`,
      ...activity.payload,
      ...activity,
      payload: undefined
    }));
  }

  async findAllForUser(id: string) {
    let activities: any[] = await this.ds.knex("activities").select([
      "id",
      "name",
      "type",
      "payload",
      this.ds.knex.raw(`json_build_object('type', 'User', 'name', user.name) as actor`)
    ]).join("users", "activities.actor", "user.id").where("actor", id);
    return activities.map(activity => ({
      "@context": "https://www.w3.org/ns/activitystreams",
      id: `https://ap.sy.sa/${activity.type}/${activity.aid}`,
      ...activity.payload,
      ...activity,
      payload: undefined
    }));
  }

  async findAllForUserInTo(id: string) {
    let activities: any[] = await this.ds.knex("activities").select([
      "id",
      "name",
      "type",
      "payload",
      this.ds.knex.raw(`json_build_object('type', 'User', 'name', user.name) as actor`)
    ]).join("user", "activities.actor", "user.id").where(this.ds.knex.raw("payload::jsonb->'to'"), '?', id);
    return activities.map(activity => ({
      "@context": "https://www.w3.org/ns/activitystreams",
      ...activity.payload,
      ...activity,
      payload: undefined
    }));
  }

  async findOne(type: string, id: string) {
    let activity: any = await this.ds.knex("activities").select([
      "id",
      "name",
      "type",
      "payload",
      this.ds.knex.raw(`json_build_object('type', 'User', 'name', user.name) as actor`)
    ]).join("user", "activities.actor", "user.id").where("aid", id).first();

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

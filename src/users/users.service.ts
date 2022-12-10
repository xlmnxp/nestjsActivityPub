import { Injectable } from '@nestjs/common';
import { ActivitiesService } from 'src/activities/activities.service';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly ds: DatabaseService, private readonly activitiesService: ActivitiesService) {}

  async create(createUserDto: any | CreateUserDto) {
    createUserDto.salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, createUserDto.salt);

    return this.ds.knex("users").insert(createUserDto).returning("*");
  }

  async findOneByPreferredUsernameAndPassword(preferredUsername: string, password: string) {
    let userData = await this.ds.knex("users").select("*").where("preferredUsername", preferredUsername).first();
    
    if(userData) {
      if (await bcrypt.hash(password, userData.salt) === userData.password) {
        let {passport, salt, ...user} = userData;
        return user;
      }
    }

    return null;
  }

  async validateByPayload(payload: Partial<User>) {
    if(payload) {
      return await this.ds.knex("users").select("*").where("id", payload?.id).andWhere("preferredUsername", payload?.preferredUsername).first();
    }
    return null;
  }

  async getUser(id: string, forAuth: boolean = false) {
    let userData = await this.ds.knex("users").select("*").where("id", id).first();

    if(!forAuth) {
      userData = {
        ...userData,
        password: undefined
      }
    }

    return userData ? {
      "@context": "https://www.w3.org/ns/activitystreams",
      ...userData
    } : null;
  }

  async getUserOutbox(id: string) {
    return this.activitiesService.findAllForUser(id);
  }

  async getUserInbox(id: string) {
    return this.activitiesService.findAllForUserInTo(id);
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}

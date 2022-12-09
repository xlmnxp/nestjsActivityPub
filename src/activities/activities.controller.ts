import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('a')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('outbox')
  async create(@Body() createActivityDto: CreateActivityDto, @Res() res: Response) {
    let activity = await this.activitiesService.create({
      ...createActivityDto,
      actor: "https://ap.sy.sa/salem/"
    })

    if(activity) {
      res.status(201).setHeader('Location', `https://ap.sy.sa/${activity.type}/${activity.aid}`).end();
    } else {
      return null;
    }
  }

  @Get(':type')
  findAll(@Param("type") type: string, @Param("id") id: string) {
    return this.activitiesService.findAll(type);
  }

  @Get(':type/:id')
  findOne(@Param("type") type: string, @Param("id") id: string) {
    return this.activitiesService.findOne(type, id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.activitiesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
  //   return this.activitiesService.update(+id, updateActivityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.activitiesService.remove(+id);
  // }
}

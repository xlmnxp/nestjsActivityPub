import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('actor')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post(':preferredUsername')
  create(@Body() createPersonDto: CreatePersonDto, @Param("preferredUsername") preferredUsername: string) {
    return this.personsService.create({
      id: `https://ap.sy.sa/${preferredUsername}/`,
      preferredUsername,
      inbox: `https://ap.sy.sa/${preferredUsername}/inbox`,
      outbox: `https://ap.sy.sa/${preferredUsername}/outbox`,
      followers: `https://ap.sy.sa/${preferredUsername}/followers`,
      following: `https://ap.sy.sa/${preferredUsername}/following`,
      liked: `https://ap.sy.sa/${preferredUsername}/liked`,
      ...createPersonDto
    });
  }

  @Get(':preferredUsername')
  getPerson(@Param("preferredUsername") preferredUsername: string) {
    return this.personsService.getPerson(`https://ap.sy.sa/${preferredUsername}/`);
  }

  @Get(':preferredUsername/outbox')
  getPersonOutbox(@Param("preferredUsername") preferredUsername: string) {
    return this.personsService.getPersonOutbox(`https://ap.sy.sa/${preferredUsername}/`);
  }

  @Get(':preferredUsername/inbox')
  inbox(@Param("preferredUsername") preferredUsername: string) {
    return this.personsService.getPersonInbox(`https://ap.sy.sa/${preferredUsername}/`);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('actor')
export class UsersController {
  constructor(private readonly personsService: UsersService) {}

  @Post('sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.personsService.create({
      id: `https://ap.sy.sa/${createUserDto.preferredUsername}/`,
      preferredUsername: createUserDto.preferredUsername,
      inbox: `https://ap.sy.sa/${createUserDto.preferredUsername}/inbox`,
      outbox: `https://ap.sy.sa/${createUserDto.preferredUsername}/outbox`,
      followers: `https://ap.sy.sa/${createUserDto.preferredUsername}/followers`,
      following: `https://ap.sy.sa/${createUserDto.preferredUsername}/following`,
      liked: `https://ap.sy.sa/${createUserDto.preferredUsername}/liked`,
      password: createUserDto.password,
      ...createUserDto
    });
  }

  @Get(':preferredUsername')
  getUser(@Param("preferredUsername") preferredUsername: string) {
    return this.personsService.getUser(`https://ap.sy.sa/${preferredUsername}/`);
  }

  @Get(':preferredUsername/outbox')
  getUserOutbox(@Param("preferredUsername") preferredUsername: string) {
    return this.personsService.getUserOutbox(`https://ap.sy.sa/${preferredUsername}/`);
  }

  @Get(':preferredUsername/inbox')
  inbox(@Param("preferredUsername") preferredUsername: string) {
    return this.personsService.getUserInbox(`https://ap.sy.sa/${preferredUsername}/`);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.personsService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }
}

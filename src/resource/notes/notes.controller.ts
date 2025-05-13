import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../users/users.decorator';
import { UsersService } from '../users/users.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService, private readonly userService: UsersService) {}
  
    @Post()
    create(@Body() createNoteDto: CreateNoteDto) {
      return this.notesService.create(createNoteDto);
    }
  
    @Get()
    findAll(@User() user?: any) {
      let u = this.userService.getUserId(user);
      console.log('u',u)
      return this.notesService.findAll(u);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string, @User() user?: any) {
      let profile = this.userService.getUserId(user);
      return this.notesService.findOne(id, profile);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @User() user?: any) {
      let profile = this.userService.getUserId(user);
      return this.notesService.update(id, updateNoteDto, profile);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @User() user?: any) {
      let profile = this.userService.getUserId(user);
      return this.notesService.remove(id, updateNoteDto, profile);
    }
}

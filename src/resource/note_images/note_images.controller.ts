import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoteImagesService } from './note_images.service';
import { CreateNoteImageDto } from './dto/create-note_image.dto';
import { UpdateNoteImageDto } from './dto/update-note_image.dto';
import { User } from '../users/users.decorator';
import { UsersService } from '../users/users.service';

@Controller('note-images')
export class NoteImagesController {
  constructor(private readonly NoteImagesService: NoteImagesService, private readonly userService: UsersService) {}
    
      @Post()
      create(@Body() createNoteImageDto: CreateNoteImageDto) {
        return this.NoteImagesService.create(createNoteImageDto);
      }
    
      @Get()
      findAll(@User() user?: any) {
        let u = this.userService.getUserId(user);
        return this.NoteImagesService.findAll(u);
      }
    
      @Get(':id')
      findOne(@Param('id') id: string, @User() user?: any) {
        let profile = this.userService.getUserId(user);
        return this.NoteImagesService.findOne(id, profile);
      }
    
      @Patch(':id')
      update(@Param('id') id: string, @Body() updateNoteImageDto: UpdateNoteImageDto, @User() user?: any) {
        let profile = this.userService.getUserId(user);
        return this.NoteImagesService.update(id, updateNoteImageDto, profile);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string, @Body() updateNoteImageDto: UpdateNoteImageDto, @User() user?: any) {
        let profile = this.userService.getUserId(user);
        return this.NoteImagesService.remove(id, updateNoteImageDto, profile);
      }
}

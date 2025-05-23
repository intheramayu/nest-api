import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NoteImagesService } from './note_images.service';
import { CreateNoteImageDto } from './dto/create-note_image.dto';
import { UpdateNoteImageDto } from './dto/update-note_image.dto';
import { User } from '../users/users.decorator';
import { UsersService } from '../users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

      @Post('upload/:note_id/:id')
      @UseInterceptors(FileInterceptor('file'))
      uploadFile(@UploadedFile() file: Express.Multer.File, 
      @Param('note_id') note_id: string,
      @Param('id') id: string) {
        return this.NoteImagesService.handleFileUpload(file, note_id, id);
      }

      @Post('upload/:note_id')
      @UseInterceptors(FileInterceptor('file'))
      uploadFileUpdate(@UploadedFile() file: Express.Multer.File, @Param('note_id') note_id: string) {
        return this.NoteImagesService.handleFileUpload(file, note_id);
      }
}

import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private NotesRepository: Repository<Note>
    ) {}
  
    create(createNotesDto: CreateNoteDto) {
      const newNotes = this.NotesRepository.create(createNotesDto);
      return {
        status: "success",
        message: "Data created successfully",
        data: this.NotesRepository.save(newNotes)
      }
    }
  
    async findAll(user: any = null) {
      return {
        status: "success",
        message: "Data Fetch successfully",
        data: await this.NotesRepository.find()
      }
    }
  
    async findOne(id: string, user: any = null) {
      return this.NotesRepository.findOneBy({id});
    }
  
    async update(id: string, updateNoteDto: UpdateNoteDto, user: any = null) {
      const Notes = await this.findOne(id);
      const userId = user.user.id;
      this.NotesRepository.merge(Notes!, {...updateNoteDto, updated_by: userId})
      return {
        status: "success",
        message: "Data updated successfully",
        data: this.NotesRepository.save(Notes!)
      }
    }
  
    async remove(id: string, updateNoteDto: UpdateNoteDto, user: any = null) {
      const Notes = await this.findOne(id);
      const userId = user.user.id;
      const updatedNotes = this.NotesRepository.merge(Notes!, 
        {deleted_at : moment().format('YYYY-MM-DD hh:mm:ss'), deleted_by: userId}); 
  
      return {
        status: "success",
        message: "Data remove successfully",
        data: this.NotesRepository.save({...updatedNotes, ...updateNoteDto})
      }
    }
}

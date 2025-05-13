import { Injectable } from '@nestjs/common';
import { CreateNoteImageDto } from './dto/create-note_image.dto';
import { UpdateNoteImageDto } from './dto/update-note_image.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteImage } from './entities/note_image.entity';

@Injectable()
export class NoteImagesService {
  constructor(
    @InjectRepository(NoteImage) private NoteImagesRepository: Repository<NoteImage>,
    @InjectRepository(User) private userRepository: Repository<User>
    ) {}
  
    create(createNoteImagesDto: CreateNoteImageDto) {
      const newNoteImages = this.NoteImagesRepository.create(createNoteImagesDto);
      return this.NoteImagesRepository.save(newNoteImages)
    }
  
    findAll(user: any = null) {
      return this.NoteImagesRepository.find();
    }
  
    async findOne(id: string, user: any = null) {
      return this.NoteImagesRepository.findOneBy({id});
    }
  
    async update(id: string, updateNoteImageDto: UpdateNoteImageDto, user: any = null) {
      const NoteImages = await this.findOne(id);
      const userId = user.user.id;
      this.NoteImagesRepository.merge(NoteImages!, {...updateNoteImageDto, updated_by: userId})
      return this.NoteImagesRepository.save(NoteImages!);
    }
  
    async remove(id: string, updateNoteImageDto: UpdateNoteImageDto, user: any = null) {
      const NoteImages = await this.findOne(id);
      const userId = user.user.id;
      const updatedNoteImages = this.NoteImagesRepository.merge(NoteImages!, 
        {deleted_at : moment().format('YYYY-MM-DD hh:mm:ss'), deleted_by: userId}); 
  
      return this.NoteImagesRepository.save({...updatedNoteImages, ...updateNoteImageDto});
    }
}

import { BadRequestException, Injectable } from '@nestjs/common';
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
      return {
        status: "success",
        message: "File uploaded successfully",
        data:this.NoteImagesRepository.save(NoteImages!)
      }
    }
  
    async remove(id: string, updateNoteImageDto: UpdateNoteImageDto, user: any = null) {
      const NoteImages = await this.findOne(id);
      const userId = user.user.id;
      const updatedNoteImages = this.NoteImagesRepository.merge(NoteImages!, 
        {deleted_at : moment().format('YYYY-MM-DD hh:mm:ss'), deleted_by: userId}); 
  
      return {
        status: "success",
        message: "File uploaded successfully",
        data: this.NoteImagesRepository.save({...updatedNoteImages, ...updateNoteImageDto})
      }
    }

    async handleFileUpload(file: Express.Multer.File, note_id: string, id?: string) {
      if (!file) {
        throw new BadRequestException('no file uploaded');
      }
  
      // validate file type
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('invalid file type');
      }
  
      // validate file size (e.g., max 5mb)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new BadRequestException('file is too large!');
      }

      // const isExist: boolean =  noteImage ? true : false;
      const data = new UpdateNoteImageDto();
      data.path = file.path;
      data.note_id = note_id;
      data.original_file_name = file.filename;
      data.url = process.env.APP_URL! + file.path;
      data.file_size = file.size;
      data.file_name = file.filename;
      data.extension = '.jpg';
      if (id) {
        const noteImage = await this.findOne(id);
        this.NoteImagesRepository.merge(noteImage! ,data);
        this.NoteImagesRepository.save(noteImage!);
      } else {
        this.create(data);
      }
      
      return {
        status: "success",
        message: "File uploaded successfully",
        data: data
      }
    }
}

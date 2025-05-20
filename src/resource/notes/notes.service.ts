import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { ApiResponseDto } from '../baseClass/ApiResponseDto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private NotesRepository: Repository<Note>,
  ) {}

  async createCustomerNote(
    customerId: string,
    createNoteDto: CreateNoteDto,
    user: any,
  ): Promise<ApiResponseDto<Note | null>> {
    try {
      if (!createNoteDto || !customerId) {
        return new ApiResponseDto(false, null, 'Note is required');
      }

      const userId = user.user.id;
      const newNote = this.NotesRepository.create({
        ...createNoteDto,
        customer_id: customerId,
      });

      const savedNotes = await this.NotesRepository.save(newNote);

      return new ApiResponseDto(true, savedNotes, 'Notes created successfully');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error creating Notes ');
    }
  }
  async findAllByCustomerId(
    customer_id: string,
  ): Promise<ApiResponseDto<Note[] | null>> {
    try {
      const data = await this.NotesRepository.find({
        where: { customer_id },
      });
      if (!data) {
        return new ApiResponseDto(false, null, 'No Notes found');
      }
      return new ApiResponseDto(true, data, 'Data fetch successfully');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error fetching Notes');
    }
  }

  async findAll(user: any = null): Promise<ApiResponseDto<Note[] | null>> {
    try {
      const data = await this.NotesRepository.find();
      if (!data) {
        return new ApiResponseDto(false, null, 'No Notes found');
      }
      return new ApiResponseDto(true, data, 'Data fetch successfully');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error fetching Notes');
    }
  }

  async findOne(id: string, user: any = null) {
    return this.NotesRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    user: any = null,
  ): Promise<ApiResponseDto<Note | null>> {
    try {
      const Notes = await this.findOne(id);
      const userId = user.user.id;
      this.NotesRepository.merge(Notes!, {
        ...updateNoteDto,
        updated_by: userId,
      });

      const updatedNotes = await this.NotesRepository.save(Notes!);
      return new ApiResponseDto(
        true,
        updatedNotes,
        'Notes updated successfully',
      );
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error updating Notes');
    }
  }

  async remove(
    id: string,
    user: any = null,
  ): Promise<ApiResponseDto<Note | null>> {
    try {
      const Notes = await this.findOne(id);
      const userId = user.user.id;
      const updatedNotes = this.NotesRepository.merge(Notes!, {
        deleted_at: moment().format('YYYY-MM-DD hh:mm:ss'),
        deleted_by: userId,
      });
      const savedNotes = await this.NotesRepository.save(updatedNotes);
      if (!savedNotes) {
        return new ApiResponseDto(false, null, 'No Notes found');
      }
      return new ApiResponseDto(true, savedNotes, 'Notes removed successfully');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error removing Notes');
    }
  }
}

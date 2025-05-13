import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note, User])],
  controllers: [NotesController],
  providers: [NotesService, UsersService],
})
export class NotesModule {}

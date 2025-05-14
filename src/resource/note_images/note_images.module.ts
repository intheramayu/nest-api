import { Module } from '@nestjs/common';
import { NoteImagesService } from './note_images.service';
import { NoteImagesController } from './note_images.controller';
import { NoteImage } from './entities/note_image.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [TypeOrmModule.forFeature([NoteImage, User]),
  MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
  }),
],
  controllers: [NoteImagesController],
  providers: [NoteImagesService, UsersService],
})
export class NoteImagesModule {}

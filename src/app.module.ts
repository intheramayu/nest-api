import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';
import { UsersModule } from './resource/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '../db/data-source';
import { CompaniesModule } from './resource/companies/companies.module';
import { CustomersModule } from './resource/customers/customers.module';
import { NotesModule } from './resource/notes/notes.module';
import { NoteImagesModule } from './resource/note_images/note_images.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot(),
    DbModule,
    UsersModule,
    CompaniesModule,
    CustomersModule,
    NotesModule,
    NoteImagesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

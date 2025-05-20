import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../users/users.decorator';
import { UsersService } from '../users/users.service';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly userService: UsersService,
  ) {}

  @Post('customer/:customerId')
  createCustomerNote(
    @Param('customerId') customerId: string,
    @Body() createNoteDto: CreateNoteDto,
    @User() user?: any,
  ) {
    let profile = this.userService.getUserId(user);
    return this.notesService.createCustomerNote(
      customerId,
      createNoteDto,
      profile,
    );
  }

  @Get()
  findAll(@User() user?: any) {
    let u = this.userService.getUserId(user);
    return this.notesService.findAll(u);
  }

  @Get('customer/:customerId')
  findAllByCustomerId(@Param('customerId') customerId: string) {
    return this.notesService.findAllByCustomerId(customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user?: any) {
    let profile = this.userService.getUserId(user);
    return this.notesService.findOne(id, profile);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @User() user?: any,
  ) {
    let profile = this.userService.getUserId(user);
    return this.notesService.update(id, updateNoteDto, profile);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user?: any) {
    let profile = this.userService.getUserId(user);
    return this.notesService.remove(id, profile);
  }
}

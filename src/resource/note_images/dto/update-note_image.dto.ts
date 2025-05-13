import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteImageDto } from './create-note_image.dto';

export class UpdateNoteImageDto extends PartialType(CreateNoteImageDto) {}

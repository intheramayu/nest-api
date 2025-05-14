import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteImageDto } from './create-note_image.dto';

export class UpdateNoteImageDto extends PartialType(CreateNoteImageDto) {
    note_id: string;
    path: string;
    file_name: string;
    original_file_name: string;
    url: string;
    file_size: number;
    extension: string;
}

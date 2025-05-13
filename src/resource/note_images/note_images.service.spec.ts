import { Test, TestingModule } from '@nestjs/testing';
import { NoteImagesService } from './note_images.service';

describe('NoteImagesService', () => {
  let service: NoteImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteImagesService],
    }).compile();

    service = module.get<NoteImagesService>(NoteImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

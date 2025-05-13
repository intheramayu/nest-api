import { Test, TestingModule } from '@nestjs/testing';
import { NoteImagesController } from './note_images.controller';
import { NoteImagesService } from './note_images.service';

describe('NoteImagesController', () => {
  let controller: NoteImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteImagesController],
      providers: [NoteImagesService],
    }).compile();

    controller = module.get<NoteImagesController>(NoteImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service.';
import { getPhoto } from '../testing/get-photo.mock';

let fileservice: FileService;

describe('FileService', () => {
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FileService],
        }).compile();

        fileservice = module.get<FileService>(FileService);
    });

    test('should be defined', () => {
        expect(fileservice).toBeDefined();
    });

    test('should be upload file', async () => {
        const photo = await getPhoto();
        const fileName = 'photo-test.png';
        await fileservice.upload(photo, fileName);
    });
});

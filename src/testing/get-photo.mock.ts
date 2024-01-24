import { getFileToBuffer } from './file-to-buffer';
import { join } from 'path';

export const getPhoto = async () => {
    const { buffer, stream } = await getFileToBuffer(
        join(__dirname, 'photo.png'),
    );
    const photo: Express.Multer.File = {
        buffer,
        stream,
        fieldname: 'file',
        originalname: 'photo.png',
        size: 1024 * 50,
        encoding: '7bit',
        mimetype: 'image/png',
        destination: '',
        filename: 'file-name',
        path: 'file-pah',
    };

    return photo;
};

import { createReadStream, ReadStream } from 'fs';

export const getFileToBuffer = async (filename: string) => {
    const readStrem = createReadStream(filename);
    const chunks = [];

    return new Promise<{ buffer: Buffer; stream: ReadStream }>(
        (resolve, reject) => {
            readStrem.on('data', (chunk) => chunks.push(chunk));

            readStrem.on('error', (err) => reject(err));

            readStrem.on('close', () => {
                resolve({
                    buffer: Buffer.concat(chunks) as Buffer,
                    stream: readStrem,
                });
            });
        },
    );
};

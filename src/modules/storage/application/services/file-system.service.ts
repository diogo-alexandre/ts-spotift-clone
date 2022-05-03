import { createWriteStream, existsSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { join } from 'path';

import { IStorageRepository } from '../repositories/storage.repository';
import { Local } from '../environments/local.environment';
import { mkdir } from 'fs/promises';

@Injectable()
export class FileSystem implements IStorageRepository<Local> {
  async save (path: string, filename: string, stream: Readable): Promise<{ size: number }> {
    if (!existsSync(path)) await mkdir(path);

    return await new Promise((resolve, reject) => {
      const writable = createWriteStream(join(path, filename));

      stream.pipe(writable)
        .on('error', (err) => reject(err))
        .on('close', () => resolve({ size: writable.bytesWritten }));
    });
  }

  static extractExt (filename: string): { filename: string, ext: string } {
    const [rest, ext] = filename.split('.').reduce(
      (previus: string, current: string, index: number, array: string[]): any => {
      return (index < array.length - 1) ? `${previus}.${current}` : [previus.trim(), current.trim()];
      }
    );

    return { filename: rest, ext };
  }
}

import { Injectable } from '@nestjs/common';
import { StorageEngine } from 'multer';
import { Request } from 'express';

import path from 'path';

import { AppConstants } from '../../../../shared/constants/app.constant';
import { File } from '../../../../shared/entities/file.entity';
import { FileSystem } from '../services/file-system.service';

@Injectable()
export class LocalStorageEngine implements StorageEngine {
  private readonly fileSystem: FileSystem
  private readonly destination: string

  constructor (fileSystem: FileSystem) {
    this.fileSystem = fileSystem;
    this.destination = `${path.resolve(AppConstants.__rootdir, 'tmp')}`;
  }

  async _handleFile (req: Request, source: Express.Multer.File, callback: (error?: any, info?: Partial<File>) => void): Promise<void> {
    const id = crypto.randomUUID();
    const { filename, ext } = FileSystem.extractExt(source.originalname);

    const file = this.fileSystem.save(this.destination, `${id}.${ext}`, source.stream)
      .then(data => new File(id, filename, ext, source.mimetype, data.size, this.destination));

    callback(null, await file);
  }

  async _removeFile (req: Request, file: File & Express.Multer.File, callback: (error: Error | null) => void): Promise<void> {
    await file.delete()
      .then(_ => callback(null))
      .catch(ex => callback(ex));
  }
}

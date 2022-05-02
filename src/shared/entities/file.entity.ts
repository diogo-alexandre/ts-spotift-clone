import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';

export class File {
  id: string
  name: string
  ext: string
  mimetype: string
  size: number
  path: string
  createdAt: Date

  constructor (id: string, name: string, ext: string, mimetype: string, size: number, path: string) {
    this.id = id;
    this.name = name;
    this.ext = ext;
    this.mimetype = mimetype;
    this.size = size;
    this.path = path;
    this.createdAt = new Date();
  }

  get stream (): ReadStream {
    return createReadStream(join(this.path, this.id) + `.${this.ext}`);
  }
}

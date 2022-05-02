import { Expose } from 'class-transformer';
import { createReadStream, ReadStream } from 'fs';
import { unlink } from 'fs/promises';
import { join } from 'path';

export class File {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  ext: string

  @Expose()
  mimetype: string

  @Expose()
  size: number

  @Expose()
  path: string

  @Expose()
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

  @Expose()
  get stream (): ReadStream {
    return createReadStream(join(this.path, this.id) + `.${this.ext}`);
  }

  async delete (): Promise<void> {
    return await unlink(join(this.path, this.id) + `.${this.ext}`);
  }
}

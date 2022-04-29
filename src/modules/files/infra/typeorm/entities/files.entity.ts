import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  ext: string

  @Column()
  mimetype: string

  @Column()
  size: number

  @Column()
  path: string

  @CreateDateColumn()
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

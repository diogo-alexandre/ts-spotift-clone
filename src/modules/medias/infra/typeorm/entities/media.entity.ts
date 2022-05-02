import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, plainToInstance } from 'class-transformer';

import { File } from '../../../../../shared/entities/file.entity';

@Entity({ name: 'medias' })
export class Media {
  @PrimaryGeneratedColumn('increment')
  @Expose()
  id!: string

  @Column()
  @Expose()
  name!: string

  @Column()
  @Expose()
  ext!: string

  @Column()
  @Expose()
  mimetype!: string

  @Column()
  @Expose()
  size!: number

  @Column()
  @Expose()
  source!: string

  @CreateDateColumn()
  @Expose()
  createdAt!: Date

  static parse (file: File): Media {
    const instance = plainToInstance(this, file, { excludeExtraneousValues: true });
    instance.source = `/media/${instance.id}`;

    return instance;
  }
}

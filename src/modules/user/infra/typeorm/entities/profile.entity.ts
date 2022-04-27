import { Expose, plainToInstance } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../../../artist/infra/typeorm/entities/artist.entity';

import { User } from './user.entity';

@Entity({ name: 'users' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id!: string

  @Column()
  @Expose()
  name!: string

  @Column()
  @Expose()
  isVerified!: boolean

  @OneToMany(type => Artist, artist => artist.profile)
  artists!: Artist[]

  @CreateDateColumn()
  @Expose()
  createdAt!: Date

  static parse (user: User): Profile {
    return plainToInstance(Profile, user, { excludeExtraneousValues: true });
  }
}

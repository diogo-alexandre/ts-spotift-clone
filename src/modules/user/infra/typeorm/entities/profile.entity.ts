import { Expose, plainToInstance } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @CreateDateColumn()
  @Expose()
  createdAt!: Date

  static parse (user: User): Profile {
    return plainToInstance(Profile, user, { excludeExtraneousValues: true });
  }
}

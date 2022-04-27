import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

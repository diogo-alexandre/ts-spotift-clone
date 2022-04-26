import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Release } from '../../../../release/infra/typeorm/entities/release.entity';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  about!: string

  @Column()
  isVerified!: boolean

  @OneToMany(type => Release, release => release.artist)
  releases!: Release[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

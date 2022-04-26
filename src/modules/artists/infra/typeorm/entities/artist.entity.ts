import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Release } from '../../../../release/infra/typeorm/entities/release.entity';
import { Song } from '../../../../song/infra/typeorm/entities/song.entity';

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

  @ManyToMany(type => Song, song => song.participants)
  @JoinTable({ name: 'song_has_artists' })
  songs!: Song[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../../../artist/infra/typeorm/entities/artist.entity';
import { Release } from '../../../../release/infra/typeorm/entities/release.entity';

@Entity({ name: 'songs' })
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  duration!: number

  @ManyToOne(type => Release, release => release.songs)
  @JoinColumn({ name: 'release_id' })
  release!: Release

  @ManyToMany(type => Artist, artist => artist.songs, { eager: true })
  @JoinTable({ name: 'song_has_artists' })
  participants!: Artist[]
}

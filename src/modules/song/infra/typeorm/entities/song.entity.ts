import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../../../artist/infra/typeorm/entities/artist.entity';
import { Media } from '../../../../medias/infra/typeorm/entities/media.entity';
import { Playlist } from '../../../../playlist/infra/typeorm/entities/playlist.entity';
import { Release } from '../../../../release/infra/typeorm/entities/release.entity';

@Entity({ name: 'songs' })
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  duration!: number

  @OneToOne(type => Media)
  @JoinColumn({ name: 'media_id' })
  media!: Media

  @ManyToOne(type => Release, release => release.songs)
  @JoinColumn({ name: 'release_id' })
  release!: Release

  @ManyToMany(type => Artist, artist => artist.songs, { eager: true, cascade: true })
  @JoinTable({
    name: 'song_has_artists',
    joinColumn: { name: 'song_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artist_id', referencedColumnName: 'id' }
  })
  participants!: Artist[]

  @ManyToMany(type => Playlist, playlist => playlist.songs)
  @JoinTable({ name: 'playlist_has_song' })
  playlists!: Playlist[]
}

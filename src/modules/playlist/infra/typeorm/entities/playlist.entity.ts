import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Song } from '../../../../song/infra/typeorm/entities/song.entity';
import { User } from '../../../../user/infra/typeorm/entities/user.entity';

@Entity({ name: 'playlists' })
export class Playlist {
  @PrimaryGeneratedColumn('increment')
  id!: string

  @ManyToOne(type => User, user => user.playlists)
  @JoinTable({ name: 'user_id' })
  user!: User

  @Column()
  name!: string

  @Column()
  about!: string

  @ManyToMany(type => Song, song => song.playlists)
  @JoinTable({ name: 'playlist_has_song' })
  songs!: Song[]

  @CreateDateColumn()
  createdAt!: Date
}

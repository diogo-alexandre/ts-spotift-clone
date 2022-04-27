import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Artist } from '../../../../artist/infra/typeorm/entities/artist.entity';
import { Playlist } from '../../../../playlist/infra/typeorm/entities/playlist.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({ default: false })
  isVerified!: boolean

  @OneToMany(type => Artist, artist => artist.user)
  artists!: Artist[]

  @OneToMany(type => Playlist, playlist => playlist.user)
  playlists!: Playlist[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Release } from '../../../../release/infra/typeorm/entities/release.entity';
import { Profile } from '../../../../user/infra/typeorm/entities/profile.entity';
import { Song } from '../../../../song/infra/typeorm/entities/song.entity';
import { User } from '../../../../user/infra/typeorm/entities/user.entity';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(type => Profile, profile => profile.artists)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  profile!: User

  @Column()
  name!: string

  @Column(({ default: '' }))
  about!: string

  @Column(({ default: 'false' }))
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

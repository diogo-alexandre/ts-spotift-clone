import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Release } from '../../../../release/infra/typeorm/entities/release.entity';
import { Profile } from '../../../../user/infra/typeorm/entities/profile.entity';
import { Song } from '../../../../song/infra/typeorm/entities/song.entity';
import { User } from '../../../../user/infra/typeorm/entities/user.entity';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'user_id' })
  @Exclude()
  userId!: string

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

  @OneToMany(type => Release, release => release.artist, { onDelete: 'CASCADE' })
  releases!: Release[]

  @ManyToMany(type => Song, song => song.participants, { onDelete: 'CASCADE' })
  songs!: Song[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @DeleteDateColumn()
  deletedAt!: Date
}

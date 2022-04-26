import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}

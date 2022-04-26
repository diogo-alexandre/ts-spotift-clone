import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReleaseCategory } from '../../../../../shared/enums/release-category.enum';
import { Artist } from '../../../../artists/infra/typeorm/entities/artist.entity';
import { Song } from '../../../../song/infra/typeorm/entities/song.entity';

@Entity({ name: 'releases' })
export class Release {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @ManyToOne(type => Artist, artist => artist.releases)
  @JoinColumn({ name: 'artist_id' })
  artist!: Artist

  @OneToMany(type => Song, song => song.release)
  songs!: Song[]

  @Column()
  category!: ReleaseCategory

  @Column()
  releaseDate!: Date

  @CreateDateColumn()
  createdAt!: Date
}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReleaseCategory } from '../../../../../shared/enums/release-category.enum';
import { Artist } from '../../../../artists/infra/typeorm/entities/artist.entity';

@Entity({ name: 'releases' })
export class Release {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @ManyToOne(type => Artist, artist => artist.releases)
  @JoinColumn({ name: 'artist_id' })
  artist!: Artist

  @Column()
  category!: ReleaseCategory

  @Column()
  releaseDate!: Date

  @CreateDateColumn()
  createdAt!: Date
}

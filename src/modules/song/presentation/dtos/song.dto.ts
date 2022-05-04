import { Artist } from '../../../artist/infra/typeorm/entities/artist.entity';
import { Release } from '../../../release/infra/typeorm/entities/release.entity';

export class SongDTO {
  name!: string
  release!: Release
  participants!: Artist[]

  constructor (name: string, release: Release, participants: Artist[]) {
    this.name = name;
    this.release = release;
    this.participants = participants;
  }
}

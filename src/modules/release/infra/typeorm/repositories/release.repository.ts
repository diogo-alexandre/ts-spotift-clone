import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../../../../artist/infra/typeorm/entities/artist.entity';
import { IReleaseRepository } from '../../../application/repositories/release.repository';
import { CreateReleaseDTO } from '../../../presentation/dtos/create-release.dto';
import { Release } from '../entities/release.entity';

@Injectable()
export class ReleaseRepository implements IReleaseRepository {
  constructor (
    @InjectRepository(Release)
    private readonly releaseRepository: Repository<Release>
  ) { }

  async create (releaseDTO: CreateReleaseDTO, artist: Artist): Promise<Release> {
    const release = this.releaseRepository.create({
      ...releaseDTO,
      artist
    });

    return await this.releaseRepository.save(release);
  }

  async findById (id: string): Promise<Release | null> {
    return await this.releaseRepository.findOne({
      where: { id }
    });
  }
}

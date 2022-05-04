import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDTO } from '../../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../../shared/interfaces/paginate.interface';
import { Artist } from '../../../../artist/infra/typeorm/entities/artist.entity';
import { IReleaseRepository } from '../../../application/repositories/release.repository';
import { CreateReleaseDTO } from '../../../presentation/dtos/create-release.dto';
import { QueryReleaseDTO } from '../../../presentation/dtos/query-release.dto';
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
      where: { id },
      relations: ['artist']
    });
  }

  async find ({ query }: QueryReleaseDTO, pagination: PaginationDTO): Promise<Paginate<Release>> {
    const limit = pagination.limit ?? 10;
    const page = pagination.page ?? 1;

    const [releases, total] = await this.releaseRepository.findAndCount({ where: query, take: limit, skip: (page - 1) * limit });

    return {
      data: releases,
      total,
      limit,
      page,
      pages: Math.ceil(total / limit)
    };
  }
}

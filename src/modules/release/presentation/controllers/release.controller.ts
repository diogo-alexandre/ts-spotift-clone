import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { User } from '../../../../shared/decorators/user.decorator';

import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { ReleaseService } from '../../application/services/release.service';
import { JwtGuard } from '../../../sign/application/guards/jwt.guard';
import { CreateReleaseDTO } from '../dtos/create-release.dto';
import { Release } from '../../infra/typeorm/entities/release.entity';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { PaginationDTO } from '../../../../shared/dtos/pagination.dto';
import { QueryReleaseDTO } from '../dtos/query-release.dto';

@Controller('/releases')
export class ReleaseController {
  constructor (
    private readonly releaseService: ReleaseService
  ) { }

  @Post()
  @UseGuards(JwtGuard)
  async create (@Body() releaseDTO: CreateReleaseDTO, @User() user: Profile): Promise<Release> {
    return await this.releaseService.create(releaseDTO, user);
  }

  @Get('/:id')
  async detail (@Param('id') id: string): Promise<Release> {
    return await this.releaseService.detail(id);
  }

  @Get()
  async index (@Query() query: QueryReleaseDTO, @Query() pagination: PaginationDTO): Promise<Paginate<Release>> {
    return await this.releaseService.find(query, pagination);
  }
}

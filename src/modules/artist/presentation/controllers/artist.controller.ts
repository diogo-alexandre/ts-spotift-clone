import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { ArtistService } from '../../application/services/artist.service';
import { JwtGuard } from '../../../sign/application/guards/jwt.guard';
import { User } from '../../../../shared/decorators/user.decorator';
import { Artist } from '../../infra/typeorm/entities/artist.entity';
import { CreateArtistDTO } from '../dtos/create-artist.dto';
import { QueryArtistDTO } from '../dtos/query-artist.dto';
import { PaginationDTO } from '../../../../shared/dtos/pagination.dto';
import { UpdateArtistDTO } from '../dtos/update-artist.dto';

@Controller('/artists')
export class ArtistController {
  constructor (
    private readonly artistService: ArtistService
  ) { }

  @Post()
  @UseGuards(JwtGuard)
  async create (@User() user: Profile, @Body() artistDTO: CreateArtistDTO): Promise<Artist> {
    return await this.artistService.create(artistDTO, user);
  }

  @Get('/:id')
  async detail (@Param('id') id: string): Promise<Artist> {
    return await this.artistService.detail(id);
  }

  @Get()
  async index (@Query() query: QueryArtistDTO, @Query() pagination: PaginationDTO): Promise<Paginate<Artist>> {
    return await this.artistService.find(query, pagination);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async remove (@User() user: Profile, @Param('id') id: string): Promise<Artist> {
    return await this.artistService.remove(id, user);
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update (@User() user: Profile, @Param('id') id: string, @Body() payload: UpdateArtistDTO): Promise<Artist> {
    return await this.artistService.update(id, payload, user);
  }
}

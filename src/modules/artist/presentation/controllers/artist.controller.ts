import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../../../../shared/decorators/user.decorator';
import { JwtGuard } from '../../../sign/application/guards/jwt.guard';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { ArtistService } from '../../application/services/artist.service';
import { Artist } from '../../infra/typeorm/entities/artist.entity';
import { CreateArtistDTO } from '../dtos/create-artist.dto';

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
}

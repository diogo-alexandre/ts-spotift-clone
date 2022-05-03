import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { SongService } from '../../application/services/song.service';
import { JwtGuard } from '../../../sign/application/guards/jwt.guard';
import { User } from '../../../../shared/decorators/user.decorator';
import { File } from '../../../../shared/entities/file.entity';
import { Song } from '../../infra/typeorm/entities/song.entity';
import { SongDTO } from '../dtos/song.dto';
import { Source } from '../../../../shared/decorators/file.decorator';

@Controller('/song')
export class SongController {
  constructor (
    private readonly songService: SongService
  ) { }

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('source'))
  async create (@User() user: Profile, @Source() source: File, @Body() songDTO: SongDTO): Promise<Song> {
    return await this.songService.create(user, songDTO, source);
  }
}

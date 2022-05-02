import { Controller } from '@nestjs/common';
import { MediaService } from '../../application/services/media.service';

@Controller('/media')
export class MediaController {
  constructor (
    private readonly mediaService: MediaService
  ) { }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Release } from './infra/typeorm/entities/release.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Release])]
})
export class ReleaseModule { }

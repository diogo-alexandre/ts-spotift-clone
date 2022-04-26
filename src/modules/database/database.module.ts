import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmConfig } from '../../shared/config/typeorm.config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: TypeOrmConfig,
      useFactory: (configService: ConfigService) => new TypeOrmConfig(configService),
      inject: [ConfigService]
    },
    {
      provide: TypeOrmModule,
      useFactory: (config: DataSource) => TypeOrmModule.forRoot(config.options),
      inject: [TypeOrmConfig]
    }
  ]
})
export class DatabaseModule { }

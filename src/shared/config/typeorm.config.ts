import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class TypeOrmConfig extends DataSource {
  constructor (configService: ConfigService) {
    const rootDir: string = path.resolve(__dirname, '..', '..');

    super({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT') ?? 3306,
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: configService.get('DB_DATABASE'),
      migrations: [path.join(rootDir, 'modules', 'database', 'infra', 'typeorm', 'migrations', '*.migration.{ts,js}')],
      entities: [path.join(rootDir, 'modules', '**', 'infra', 'typeorm', 'entities', '*.entity.{ts,js}')],
      namingStrategy: new SnakeNamingStrategy()
    });
  }
}

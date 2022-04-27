import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { QueryExceptionFilter } from './shared/filters/query-exception.filter';
import ValidationPipe from './shared/pipes/validation.pipe';

class Server {
  static async init (): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.PORT ?? 3333;

    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new QueryExceptionFilter());

    await app.listen(port);
  }
}

export default Server;

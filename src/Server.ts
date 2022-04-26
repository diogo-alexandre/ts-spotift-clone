import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

class Server {
  static async init (): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.PORT ?? 3333;

    await app.listen(port);
  }
}

export default Server;

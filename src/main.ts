import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // enable REPL for debug
  // return repl(AppModule)
}
bootstrap();

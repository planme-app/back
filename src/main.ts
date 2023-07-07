import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const acao = { origin: ['https://www.planmeapp.com'] };
  if (process.env.IS_DEV) {
    acao.origin.push('http://localhost:3000');
  }
  app.enableCors(acao);
  await app.listen(4000);
}
bootstrap();

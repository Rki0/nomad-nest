import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // 유저가 보낸 데이터를 우리가 원하는 타입으로 변경할수 있게 한다. 예를들어 url 파라미터는 string인데 number로 자동 변환되게끔 해줌.
    }),
  );

  await app.listen(3000);
}
bootstrap();

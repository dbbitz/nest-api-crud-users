import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';

//Confiuração de webscokets, redis, openAPI para documentação

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalInterceptors(new LogInterceptor());

    await app.listen(3000);
}
bootstrap();

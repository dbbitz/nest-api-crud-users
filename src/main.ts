import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LogInterceptor } from './interceptors/log.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';

//Confiuração de webscokets, redis, openAPI para documentação

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
        cors: true,
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    app.enableCors();

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new LogInterceptor());

    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('API')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();

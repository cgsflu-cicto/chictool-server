import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api', {
        exclude: [{ path: 'health', method: RequestMethod.ALL }],
    });
    app.enableCors({
        origin:
            process.env.CORS_ORIGIN?.split(',').map((value) => value.trim()) ||
            true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    await app.listen(process.env.PORT ?? 3000, process.env.HOST ?? '0.0.0.0');
}
await bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

class App {
  private setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder().build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  private setupGlobalPipe(app: INestApplication) {
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
  }

  async bootstrap() {
    const app = await NestFactory.create(AppModule);

    this.setupSwagger(app);

    app.enableShutdownHooks();

    this.setupGlobalPipe(app);

    await app.listen(3000, () => console.log('listening port 3000'));
  }
}

async function bootstrap() {
  new App().bootstrap().then();
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClerkAuthorizationGuard } from './modules/authorization/clerk-authorization.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new ClerkAuthorizationGuard());

  const config = new DocumentBuilder()
    .setTitle('FitForce API')
    .setDescription('REST API for FitForce application.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

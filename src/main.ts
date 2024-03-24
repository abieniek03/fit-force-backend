import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClerkAuthorizationGuard } from './modules/authorization/clerk-authorization.guard';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new ClerkAuthorizationGuard());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('FitForce API')
    .setDescription('REST API for FitForce application.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });

  await app.listen(3000);
}
bootstrap();

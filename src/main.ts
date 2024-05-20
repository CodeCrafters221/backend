import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger for API documentations

  const config = new DocumentBuilder()
  .setTitle('Projet Microfinance codecrafters 2021')
  .setDescription('Automatisation de processus d\'octroi de prêt d\'une structure de microfinance')
  .setVersion('1.0')
  .addTag('microfiance')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8080 );
}
bootstrap();

/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Cross-origin resource sharing
  app.setGlobalPrefix('api'); // Set global prefix to "api/"

  // Swagger for API documentations

  const config = new DocumentBuilder()
  .setTitle('Automatisation de processus d\'octroi de prêt d\'une structure de microfinance')
  .setDescription('The microfinance API description')
  .setVersion('1.0')
  .addTag('microfinance')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(process.env.PORT || 8080);
  console.log("MAIN GATEWAY STARTED ON PORT: ", process.env.PORT)
}
bootstrap();

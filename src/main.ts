import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger for API documentations

  const config = new DocumentBuilder()
  .setTitle('Reservation Nest Edacy')
  .setDescription('The digital market API description')
  .setVersion('1.0')
  .addTag('market')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8080 );
}
bootstrap();

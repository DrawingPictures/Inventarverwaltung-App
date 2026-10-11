import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS aktivieren, damit das Frontend (Port 3000) anfragen senden darf
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  //Backend auf Port 3000, damit Port 3000 fürs Frontend frei bleibt
  await app.listen(3001, '127.0.0.1');
  
  console.log('Backend läuft auf http://localhost:3001');
}
bootstrap();

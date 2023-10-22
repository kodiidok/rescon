import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env['PORT'] ?? 3000;
  const app = await NestFactory.create(ServerModule);

  const config = new DocumentBuilder()
    .setTitle('Rescon')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`🚀 server started on http://localhost:${port}`);
  console.log(`🚀 swagger started on http://localhost:${port}/api`);
}
bootstrap();

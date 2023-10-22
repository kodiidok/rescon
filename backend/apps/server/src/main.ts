import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  const port = process.env['PORT'] ?? 3000;
  await app.listen(port);
  console.log(`🚀 server started on http://localhost:${port}`);
}
bootstrap();

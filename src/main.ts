import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`🍕 Pizza-AI rodando na porta ${port}`);
}

bootstrap().catch((err) => {
  console.error('Erro ao iniciar aplicação:', err);
  process.exit(1);
});
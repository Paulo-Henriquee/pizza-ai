import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';  // 👈 NOVO
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validação automática
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Habilita CORS
  app.enableCors();

  // 👇 NOVO: Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Pizza-AI API')
    .setDescription('API de gerenciamento de pizzaria com IA')
    .setVersion('1.0')
    .addTag('ingredients', 'Gerenciamento de ingredientes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // 👆 Acessa em: http://localhost:8000/api

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🍕 Pizza-AI rodando na porta ${port}`);
  console.log(`📚 Documentação: http://localhost:${port}/api`);  // 👈 NOVO
}

bootstrap().catch((err) => {
  console.error('Erro ao iniciar aplicação:', err);
  process.exit(1);
});
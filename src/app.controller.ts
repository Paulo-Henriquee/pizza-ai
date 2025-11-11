import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  
  @Get()
  @ApiOperation({ summary: 'Informações gerais da API' })
  getInfo() {
    return {
      name: 'Pizza-AI API',
      version: '1.0.0',
      description: 'Sistema de gerenciamento de pizzaria com Inteligência Artificial',
      author: 'Paulo',
      documentation: {
        swagger: '/api',
        description: 'Documentação interativa da API',
      },
      modules: {
        ingredients: {
          endpoint: '/ingredients',
          description: 'Gerenciamento de ingredientes',
        },
        // Futuramente: stock, products, orders, ai-analytics, chatbot
      },
      status: 'online ✅',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Verificar saúde da aplicação' })
  getHealth() {
    return {
      status: 'healthy',
      uptime: `${Math.floor(process.uptime())} segundos`,
      timestamp: new Date().toISOString(),
      database: 'connected',
      service: 'pizza-ai',
    };
  }
}
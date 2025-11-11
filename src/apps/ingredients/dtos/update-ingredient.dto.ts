import { IsString, IsNumber, Min, MinLength, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';  // 👈 NOVO

/**
 * DTO para atualizar um ingrediente
 */
export class UpdateIngredientDto {
  @ApiPropertyOptional({
    description: 'Nome do ingrediente',
    example: 'Mussarela',
    minLength: 2,
  })
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Unidade de medida',
    example: 'kg',
  })
  @IsOptional()
  @IsString({ message: 'Unidade deve ser uma string' })
  unit?: string;

  @ApiPropertyOptional({
    description: 'Estoque mínimo antes do alerta',
    example: 5,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Estoque mínimo deve ser um número' })
  @Min(0, { message: 'Estoque mínimo deve ser maior ou igual a zero' })
  minimumStock?: number;
}
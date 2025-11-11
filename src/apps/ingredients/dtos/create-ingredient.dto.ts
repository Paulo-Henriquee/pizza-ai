import { IsString, IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  // 👈 NOVO

/**
 * DTO para criar um ingrediente
 */
export class CreateIngredientDto {
  @ApiProperty({
    description: 'Nome do ingrediente',
    example: 'Mussarela',
    minLength: 2,
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Unidade de medida',
    example: 'kg',
  })
  @IsString({ message: 'Unidade deve ser uma string' })
  @IsNotEmpty({ message: 'Unidade é obrigatória' })
  unit: string;

  @ApiProperty({
    description: 'Estoque mínimo antes do alerta',
    example: 5,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Estoque mínimo deve ser um número' })
  @Min(0, { message: 'Estoque mínimo deve ser maior ou igual a zero' })
  minimumStock: number;
}
import { IsString, IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';

/**
 * DTO para criar um ingrediente
 * 
 * Usa class-validator para validação automática
 */
export class CreateIngredientDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  name: string;

  @IsString({ message: 'Unidade deve ser uma string' })
  @IsNotEmpty({ message: 'Unidade é obrigatória' })
  unit: string;

  @IsNumber({}, { message: 'Estoque mínimo deve ser um número' })
  @Min(0, { message: 'Estoque mínimo deve ser maior ou igual a zero' })
  minimumStock: number;
}
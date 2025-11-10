import { IsString, IsNumber, Min, MinLength, IsOptional } from 'class-validator';

/**
 * DTO para atualizar um ingrediente
 *
 * Todos os campos são opcionais (partial update)
 */
export class UpdateIngredientDto {
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Unidade deve ser uma string' })
  unit?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Estoque mínimo deve ser um número' })
  @Min(0, { message: 'Estoque mínimo deve ser maior ou igual a zero' })
  minimumStock?: number;
}
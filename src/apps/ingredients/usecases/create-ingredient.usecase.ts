import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { IngredientEntity } from '../entities/ingredient.entity';
import type { IIngredientRepository } from '../repositories/ingredient.repository.interface';

/**
 * Use Case: Criar um ingrediente
 * 
 * Responsabilidade: Validar regras de negócio e criar o ingrediente
 */
@Injectable()
export class CreateIngredientUseCase {
  constructor(
    @Inject('IIngredientRepository')
    private readonly repository: IIngredientRepository,
  ) {}

  async execute(data: CreateIngredientInput): Promise<IngredientEntity> {
    // 1. Criar entidade para validar regras de negócio
    const ingredient = new IngredientEntity(data);

    // 2. Validar nome
    if (!ingredient.isValidName()) {
      throw new BadRequestException('Nome do ingrediente deve ter pelo menos 2 caracteres');
    }

    // 3. Validar estoque mínimo
    if (!ingredient.isValidMinimumStock()) {
      throw new BadRequestException('Estoque mínimo deve ser maior ou igual a zero');
    }

    // 4. Salvar no banco através do repository
    return await this.repository.create({
      name: data.name,
      unit: data.unit,
      minimumStock: data.minimumStock,
    });
  }
}

export type CreateIngredientInput = {
  name: string;
  unit: string;
  minimumStock: number;
};
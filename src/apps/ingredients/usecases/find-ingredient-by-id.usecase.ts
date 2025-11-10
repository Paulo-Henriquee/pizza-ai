import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientEntity } from '../entities/ingredient.entity';
import type { IIngredientRepository } from '../repositories/ingredient.repository.interface';

/**
 * Use Case: Buscar ingrediente por ID
 * 
 * Responsabilidade: Buscar um ingrediente específico e lançar erro se não existir
 */
@Injectable()
export class FindIngredientByIdUseCase {
  constructor(private readonly repository: IIngredientRepository) {}

  async execute(id: string): Promise<IngredientEntity> {
    const ingredient = await this.repository.findById(id);

    if (!ingredient) {
      throw new NotFoundException(`Ingrediente com ID ${id} não encontrado`);
    }

    return ingredient;
  }
}
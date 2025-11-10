import { Injectable, NotFoundException } from '@nestjs/common';
import type { IIngredientRepository } from '../repositories/ingredient.repository.interface';

/**
 * Use Case: Deletar um ingrediente
 * 
 * Responsabilidade: Verificar se existe e deletar
 */
@Injectable()
export class DeleteIngredientUseCase {
  constructor(private readonly repository: IIngredientRepository) {}

  async execute(id: string): Promise<void> {
    // 1. Verificar se o ingrediente existe
    const ingredient = await this.repository.findById(id);
    if (!ingredient) {
      throw new NotFoundException(`Ingrediente com ID ${id} não encontrado`);
    }

    // 2. Deletar
    await this.repository.delete(id);
  }
}
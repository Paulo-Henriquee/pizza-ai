import { Injectable } from '@nestjs/common';
import { IngredientEntity } from '../entities/ingredient.entity';
import type { IIngredientRepository } from '../repositories/ingredient.repository.interface';

/**
 * Use Case: Listar todos os ingredientes
 * 
 * Responsabilidade: Buscar e retornar todos os ingredientes
 */
@Injectable()
export class FindAllIngredientsUseCase {
  constructor(private readonly repository: IIngredientRepository) {}

  async execute(): Promise<IngredientEntity[]> {
    return await this.repository.findAll();
  }
}
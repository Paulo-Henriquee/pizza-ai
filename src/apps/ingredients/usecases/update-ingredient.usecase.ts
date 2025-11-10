import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IngredientEntity } from '../entities/ingredient.entity';
import type { IIngredientRepository } from '../repositories/ingredient.repository.interface';

/**
 * Use Case: Atualizar um ingrediente
 * 
 * Responsabilidade: Validar e atualizar um ingrediente existente
 */
@Injectable()
export class UpdateIngredientUseCase {
  constructor(private readonly repository: IIngredientRepository) {}

  async execute(id: string, data: UpdateIngredientInput): Promise<IngredientEntity> {
    // 1. Verificar se o ingrediente existe
    const existingIngredient = await this.repository.findById(id);
    if (!existingIngredient) {
      throw new NotFoundException(`Ingrediente com ID ${id} não encontrado`);
    }

    // 2. Se tiver nome novo, validar
    if (data.name !== undefined) {
      const tempEntity = new IngredientEntity({ name: data.name });
      if (!tempEntity.isValidName()) {
        throw new BadRequestException('Nome do ingrediente deve ter pelo menos 2 caracteres');
      }
    }

    // 3. Se tiver estoque mínimo novo, validar
    if (data.minimumStock !== undefined) {
      const tempEntity = new IngredientEntity({ minimumStock: data.minimumStock });
      if (!tempEntity.isValidMinimumStock()) {
        throw new BadRequestException('Estoque mínimo deve ser maior ou igual a zero');
      }
    }

    // 4. Atualizar no banco
    return await this.repository.update(id, data);
  }
}

export type UpdateIngredientInput = {
  name?: string;
  unit?: string;
  minimumStock?: number;
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { IngredientEntity } from '../entities/ingredient.entity';
import {
  IIngredientRepository,
  CreateIngredientData,
  UpdateIngredientData,
} from './ingredient.repository.interface';

/**
 * Implementação do Repository usando Prisma
 * 
 * Esta classe SIM sabe sobre Prisma.
 * Mas os Use Cases não sabem! Eles só conhecem a interface.
 */
@Injectable()
export class IngredientRepository implements IIngredientRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateIngredientData): Promise<IngredientEntity> {
    const ingredient = await this.prisma.ingredient.create({
      data,
    });

    return new IngredientEntity(ingredient);
  }

  async findAll(): Promise<IngredientEntity[]> {
    const ingredients = await this.prisma.ingredient.findMany({
      orderBy: { name: 'asc' },
    });

    return ingredients.map((ing) => new IngredientEntity(ing));
  }

  async findById(id: string): Promise<IngredientEntity | null> {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      return null;
    }

    return new IngredientEntity(ingredient);
  }

  async update(id: string, data: UpdateIngredientData): Promise<IngredientEntity> {
    const ingredient = await this.prisma.ingredient.update({
      where: { id },
      data,
    });

    return new IngredientEntity(ingredient);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.ingredient.delete({
      where: { id },
    });
  }
}
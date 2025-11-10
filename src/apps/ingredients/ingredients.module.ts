import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientRepository } from './repositories/ingredient.repository';
import { CreateIngredientUseCase } from './usecases/create-ingredient.usecase';
import { FindAllIngredientsUseCase } from './usecases/find-all-ingredients.usecase';
import { FindIngredientByIdUseCase } from './usecases/find-ingredient-by-id.usecase';
import { UpdateIngredientUseCase } from './usecases/update-ingredient.usecase';
import { DeleteIngredientUseCase } from './usecases/delete-ingredient.usecase';

/**
 * Módulo de Ingredientes
 * 
 * Registra e organiza todos os componentes do módulo
 */
@Module({
  controllers: [IngredientsController],
  providers: [
    // Repository
    {
      provide: 'IIngredientRepository',
      useClass: IngredientRepository,
    },
    // Use Cases
    CreateIngredientUseCase,
    FindAllIngredientsUseCase,
    FindIngredientByIdUseCase,
    UpdateIngredientUseCase,
    DeleteIngredientUseCase,
  ],
})
export class IngredientsModule {}
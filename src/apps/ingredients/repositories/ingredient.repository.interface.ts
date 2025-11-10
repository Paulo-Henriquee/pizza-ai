import { IngredientEntity } from '../entities/ingredient.entity';

/**
 * Interface do Repository de Ingredientes
 * 
 * Define o CONTRATO que qualquer implementação deve seguir.
 * Não importa se é Prisma, TypeORM, MongoDB... deve implementar esses métodos!
 */
export interface IIngredientRepository {
  /**
   * Cria um novo ingrediente
   */
  create(data: CreateIngredientData): Promise<IngredientEntity>;

  /**
   * Busca todos os ingredientes
   */
  findAll(): Promise<IngredientEntity[]>;

  /**
   * Busca um ingrediente por ID
   */
  findById(id: string): Promise<IngredientEntity | null>;

  /**
   * Atualiza um ingrediente
   */
  update(id: string, data: UpdateIngredientData): Promise<IngredientEntity>;

  /**
   * Deleta um ingrediente
   */
  delete(id: string): Promise<void>;
}

/**
 * Tipos auxiliares
 */
export type CreateIngredientData = {
  name: string;
  unit: string;
  minimumStock: number;
};

export type UpdateIngredientData = Partial<CreateIngredientData>;
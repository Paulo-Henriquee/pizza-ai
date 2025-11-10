/**
 * Ingredient Entity
 * 
 * Representa um ingrediente no domínio da aplicação.
 * Contém as regras de negócio relacionadas a ingredientes.
 */
export class IngredientEntity {
    id: string;
    name: string;
    unit: string;
    minimumStock: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(data: Partial<IngredientEntity>) {
      Object.assign(this, data);
    }
  
    /**
     * Regra de negócio: Verifica se o estoque está baixo
     * @param currentStock - Quantidade atual em estoque
     * @returns true se o estoque está abaixo do mínimo
     */
    isLowStock(currentStock: number): boolean {
        return typeof this.minimumStock === 'number' &&
        typeof currentStock === 'number' &&
        currentStock < this.minimumStock;
    }
  
    /**
     * Regra de negócio: Valida se o nome é válido
     * @returns true se o nome é válido
     */
    isValidName(): boolean {
      return typeof this.name === 'string' && this.name.trim().length >= 2;
    }
  
    /**
     * Regra de negócio: Valida se o estoque mínimo é válido
     * @returns true se o estoque mínimo é válido
     */
    isValidMinimumStock(): boolean {
        return typeof this.minimumStock === 'number' && this.minimumStock >= 0;
    }
  }
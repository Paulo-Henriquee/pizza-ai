import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { CreateIngredientDto } from './dtos/create-ingredient.dto';
  import { UpdateIngredientDto } from './dtos/update-ingredient.dto';
  import { CreateIngredientUseCase } from './usecases/create-ingredient.usecase';
  import { FindAllIngredientsUseCase } from './usecases/find-all-ingredients.usecase';
  import { FindIngredientByIdUseCase } from './usecases/find-ingredient-by-id.usecase';
  import { UpdateIngredientUseCase } from './usecases/update-ingredient.usecase';
  import { DeleteIngredientUseCase } from './usecases/delete-ingredient.usecase';
  
  /**
   * Controller de Ingredientes
   * 
   * Responsável por receber requisições HTTP e delegar para os Use Cases
   */
  @Controller('ingredients')
  export class IngredientsController {
    constructor(
      private readonly createUseCase: CreateIngredientUseCase,
      private readonly findAllUseCase: FindAllIngredientsUseCase,
      private readonly findByIdUseCase: FindIngredientByIdUseCase,
      private readonly updateUseCase: UpdateIngredientUseCase,
      private readonly deleteUseCase: DeleteIngredientUseCase,
    ) {}
  
    /**
     * POST /ingredients
     * Criar um novo ingrediente
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createDto: CreateIngredientDto) {
      return await this.createUseCase.execute(createDto);
    }
  
    /**
     * GET /ingredients
     * Listar todos os ingredientes
     */
    @Get()
    async findAll() {
      return await this.findAllUseCase.execute();
    }
  
    /**
     * GET /ingredients/:id
     * Buscar um ingrediente por ID
     */
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.findByIdUseCase.execute(id);
    }
  
    /**
     * PUT /ingredients/:id
     * Atualizar um ingrediente
     */
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateDto: UpdateIngredientDto,
    ) {
      return await this.updateUseCase.execute(id, updateDto);
    }
  
    /**
     * DELETE /ingredients/:id
     * Deletar um ingrediente
     */
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
      await this.deleteUseCase.execute(id);
    }
  }
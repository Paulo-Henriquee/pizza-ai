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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';  // 👈 NOVO
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';
import { CreateIngredientUseCase } from './usecases/create-ingredient.usecase';
import { FindAllIngredientsUseCase } from './usecases/find-all-ingredients.usecase';
import { FindIngredientByIdUseCase } from './usecases/find-ingredient-by-id.usecase';
import { UpdateIngredientUseCase } from './usecases/update-ingredient.usecase';
import { DeleteIngredientUseCase } from './usecases/delete-ingredient.usecase';

@ApiTags('ingredients')  // 👈 NOVO
@Controller('ingredients')
export class IngredientsController {
  constructor(
    private readonly createUseCase: CreateIngredientUseCase,
    private readonly findAllUseCase: FindAllIngredientsUseCase,
    private readonly findByIdUseCase: FindIngredientByIdUseCase,
    private readonly updateUseCase: UpdateIngredientUseCase,
    private readonly deleteUseCase: DeleteIngredientUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo ingrediente' })  // 👈 NOVO
  @ApiResponse({ status: 201, description: 'Ingrediente criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createDto: CreateIngredientDto) {
    return await this.createUseCase.execute(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os ingredientes' })  // 👈 NOVO
  @ApiResponse({ status: 200, description: 'Lista de ingredientes' })
  async findAll() {
    return await this.findAllUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar ingrediente por ID' })  // 👈 NOVO
  @ApiResponse({ status: 200, description: 'Ingrediente encontrado' })
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.findByIdUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um ingrediente' })  // 👈 NOVO
  @ApiResponse({ status: 200, description: 'Ingrediente atualizado' })
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateIngredientDto,
  ) {
    return await this.updateUseCase.execute(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um ingrediente' })  // 👈 NOVO
  @ApiResponse({ status: 204, description: 'Ingrediente deletado' })
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute(id);
  }
}
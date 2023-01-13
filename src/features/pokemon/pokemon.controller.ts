import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getAllPokemon() {
    return this.pokemonService.getPokemon();
  }

  @Get('id/:id')
  getPokemonById(@Param('id') id: number) {
    return this.pokemonService.getPokemonById(id);
  }

  @Get('name/:name')
  getPokemonByName(@Param('name') name: string) {
    return this.pokemonService.getPokemonByName(name);
  }

  @Get('type/:type')
  getPokemonByType(@Param('type') type: string) {
    return this.pokemonService.getPokemonByType(type);
  }

  @Get('generation/:generation')
  getPokemonByGeneration(@Param('generation') generation: string) {
    return this.pokemonService.getPokemonByGeneration(generation);
  }
}

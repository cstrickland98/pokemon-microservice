import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Pokemon } from './db/entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async getPokemon(): Promise<Pokemon[]> {
    const result = await this.pokemonRepository.find();
    return result;
  }

  async getPokemonById(id: number): Promise<Pokemon | null> {
    const result = await this.pokemonRepository.findOneBy({ id });
    return result;
  }

  async getPokemonByName(name: string): Promise<Pokemon[] | null> {
    const result = await this.pokemonRepository.findBy({
      name: ILike('%' + name + '%'),
    });
    return result;
  }

  async getPokemonByType(type: string): Promise<Pokemon[] | null> {
    const result = await this.pokemonRepository
      .createQueryBuilder()
      .where('type1 = :type', { type })
      .orWhere('type2 = :type', { type })
      .getMany();
    return result;
  }

  async getPokemonByGeneration(generation: string): Promise<Pokemon[] | null> {
    const result = await this.pokemonRepository.findBy({ generation });
    return result;
  }
}

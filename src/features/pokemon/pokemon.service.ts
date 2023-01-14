import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Pokemon } from './db/entities/pokemon.entity';
import { PokemonRequestDto } from './pokemonRequest.dto';

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

  async getPokemonByCriteria(request: PokemonRequestDto): Promise<Pokemon[]> {
    const hasId = request.id ? true : false;
    const hasName = request.name ? true : false;
    const hasType1 = request.type1 ? true : false;
    const hasType2 = request.type2 ? true : false;
    const hasGeneration = request.generation ? true : false;
    const andConditional = request.logicalOperator === 'And' ? true : false;

    const query = this.pokemonRepository.createQueryBuilder();

    if (hasId) {
      andConditional
        ? query.andWhere('id = :id', { id: request.id })
        : query.orWhere('id = :id', { id: request.id });
    }
    if (hasName) {
      andConditional
        ? query.andWhere({ name: ILike('%' + request.name + '%') })
        : query.orWhere({ name: ILike('%' + request.name + '%') });
    }
    if (hasType1 || hasType2) {
      if (hasType1 && !hasType2) {
        andConditional
          ? query.andWhere('(type1 = :type1 OR type2 = :type1)', {
              type1: request.type1,
            })
          : query.orWhere('(type1 = :type1 OR type2 = :type1)', {
              type1: request.type1,
            });
      } else if (!hasType1 && hasType2) {
        andConditional
          ? query.andWhere('(type1 = :type2 OR type2 = :type2)', {
              type2: request.type1,
            })
          : query.orWhere('(type1 = :type2 OR type2 = :type2)', {
              type2: request.type1,
            });
      } else if (hasType1 && hasType2) {
        andConditional
          ? query.andWhere(
              '(type1 = :type1 OR type2 = :type1 OR type1 = :type2 OR type2 = :type2)',
              { type1: request.type1, type2: request.type1 },
            )
          : query.orWhere(
              '(type1 = :type1 OR type2 = :type1 OR type1 = :type2 OR type2 = :type2)',
              { type1: request.type1, type2: request.type1 },
            );
      }
    }
    if (hasGeneration) {
      andConditional
        ? query.andWhere('generation = :generation', {
            generation: request.generation,
          })
        : query.orWhere('generation = :generation', {
            generation: request.generation,
          });
    }

    const result = await query.getMany();

    return result;
  }
}

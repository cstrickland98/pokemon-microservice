import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PokemonRequestDto {
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  type1: string;

  @IsOptional()
  @IsString()
  type2: string;

  @IsOptional()
  @IsString()
  generation: string;

  @IsOptional()
  @IsString()
  logicalOperator: string;
}

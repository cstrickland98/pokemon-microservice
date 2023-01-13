import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
    name: 'name',
  })
  name: string;

  @Column({
    type: String,
    name: 'type1',
  })
  type1: string;

  @Column({
    type: String,
    name: 'type2',
  })
  type2: string;

  @Column({
    type: String,
    name: 'generation',
  })
  generation: string;
}

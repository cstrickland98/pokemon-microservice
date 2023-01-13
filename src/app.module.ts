import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PokemonModule } from './features/pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'mariadb.gamersanonymous.ddns.net',
      port: 3306,
      username: 'pokedexadmin',
      password: 'pokeadmin',
      database: 'pokedex',
      autoLoadEntities: true,
    }),
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

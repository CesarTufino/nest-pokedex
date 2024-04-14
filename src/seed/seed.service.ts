import { Injectable } from '@nestjs/common';
//import { HttpService } from '@nestjs/axios';
//import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { PokeResponse } from './interfaces/poke-responde.interface';
//import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  //constructor(private readonly pokemonService: PokemonService) {}
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      //const pokemon = await this.pokemonModel.create({ name, no });
      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed';
  }

  // Intento enviando Observable
  // constructor(private httpService: HttpService) {}

  // executeSeed(): Observable<AxiosResponse<any>> {
  //   return this.httpService
  //     .get('https://pokeapi.co/api/v2/pokemon?limit=10')

  //     .pipe(map((axiosResponse: AxiosResponse) => axiosResponse.data));
  // }

  // Obtener Promise de Observable
  // constructor(private httpService: HttpService) {}

  // async executeSeed(): Promise<any> {
  //   // const response: AxiosResponse<any> = await firstValueFrom(
  //   const { data } = await firstValueFrom(
  //     this.httpService.get<PokeResponse>(
  //       'https://pokeapi.co/api/v2/pokemon?limit=10',
  //     ),
  //   );
  //   data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const no: number = +segments[segments.length - 2];
  //     console.log({ name, no });
  //   });
  //   return data.results;
  // }
}

import { Injectable } from '@nestjs/common';
//import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { PokeResponse } from './interfaces/poke-responde.interface';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      console.log({ name, no });
    });
    return data.results;
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

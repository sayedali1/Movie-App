import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IMovie } from '../Models/imovie';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IMovieListResponse } from '../Models/imovie-list-response';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  removeFromWishlist(arg0: any) {
    throw new Error('Method not implemented.');
  }
  addToWishlist(arg0: any) {
    throw new Error('Method not implemented.');
  }
  private apiKey = '54e4c1f2712d7651666ba7e25f5af2e6';

  // Signal to hold the current movie ID
  movieId = signal(11);
  genreId = signal(28);
  // Resource created at the top level, using the signal
  movieByIdResource = httpResource<IMovie>(
    () =>
      `${environment.pathUrl}movie/${this.movieId()}?api_key=${
        environment.apiKey
      }`,
    { defaultValue: {} as IMovie }
  );


  getMoviesByPage(page: number): Observable<IMovieListResponse> {
    const url = `${environment.pathUrl}movie/popular?api_key=${environment.apiKey}&page=${page}`;
    return this.http.get<IMovieListResponse>(url);
  }

  popularMoviesResource = httpResource<IMovie[]>(
    () => `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`)
  
  RecommendedMoviesResource = httpResource<IMovie[]>(
    () => `https://api.themoviedb.org/3/movie/recommendations?api_key=${this.apiKey}&language=en-US&page=1`,
    { defaultValue: [] as IMovie[] })

  GenreResource = httpResource<IMovie[]>(
    () => `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`,
    { defaultValue: [] as IMovie[] }
  );
  MovieByGenreResource = httpResource<IMovie[]>(
    () => `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_genres=${this.genreId()}`,
    { defaultValue: [] as IMovie[] }
  );
  

}

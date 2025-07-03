import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IMovie } from '../Models/imovie';

import { environment } from '../../environments/environment.development';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IMovieListResponse } from '../Models/imovie-list-response';
import { IGenre } from '../Models/igenre';

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

  genreId = signal(28); // Default genre ID, can be changed later

  // Resource created at the top level, using the signal
  movieByIdResource = httpResource<IMovie>(
    () =>
      `https://api.themoviedb.org/3/movie/${this.movieId()}?api_key=${
        this.apiKey
      }`,
    { defaultValue: {} as IMovie }
  );

  popularMovies = httpResource<{ results: IMovie[] }>(
    () => `${environment.pathUrl}movie/popular?api_key=${environment.apiKey}`,
    { defaultValue: { results: [] } }
  );


  getMoviesByPage(page: number): Observable<IMovieListResponse> {
    const url = `${environment.pathUrl}movie/popular?api_key=${environment.apiKey}&page=${page}`;
    return this.http.get<IMovieListResponse>(url);
  }

  searchMovies(
    query: string,
    page: number = 1
  ): Observable<IMovieListResponse> {
    const url = `${environment.pathUrl}search/movie?api_key=${environment.apiKey}&query=${query}&page=${page}`;
    return this.http.get<IMovieListResponse>(url);
  }

  popularMoviesResource = httpResource<IMovie[]>(
    () => `${environment.pathUrl}movie/popular?api_key=${environment.apiKey}`
  );


  RecommendedMoviesResource = httpResource<IMovie[]>(
    () =>
      `${environment.pathUrl}movie/recommendations?api_key=${environment.apiKey}&language=en-US&page=1`,
    { defaultValue: [] as IMovie[] }
  );

  GenreResource = httpResource<IMovie[]>(
    () =>
      `${environment.pathUrl}genre/movie/list?api_key=${environment.apiKey}&language=en-US`,

  );

  MovieByGenreResource = httpResource<IMovie[]>(
    () =>

      `${environment.pathUrl}discover/movie?api_key=${
        environment.apiKey
      }&with_genres=${this.genreId()}`,
    { defaultValue: [] as IMovie[] }
  );

  getAllGenres(): Observable<IGenre[]> {
    return this.http
      .get<{ genres: IGenre[] }>(
        `${environment.pathUrl}genre/movie/list?api_key=${environment.apiKey}`
      )
      .pipe(map((res) => res.genres));
  }

  getMoviesByGenre(genreId: number): Observable<IMovie[]> {
    const url = `${environment.pathUrl}discover/movie?api_key=${environment.apiKey}&with_genres=${genreId}`;
    return this.http
      .get<{ results: IMovie[] }>(url)
      .pipe(map((res) => res.results));
  }

  getAllGenresWithMovies(): Observable<{ genre: IGenre; movies: IMovie[] }[]> {
    return this.getAllGenres().pipe(
      // For each genre, fetch its movies
      map((genres) =>
        genres.map((genre) => ({
          genre,
          movies$: this.getMoviesByGenre(genre.id),
        }))
      ),
     
      switchMap((genreWithMovies$Arr) =>
        forkJoin(
          genreWithMovies$Arr.map((gm) =>
            gm.movies$.pipe(map((movies) => ({ genre: gm.genre, movies })))
          )
        )
      )
    );
  }
  getMoviesByGenreWithPagination(
    genreId: number,
    page: number
  ): Observable<{ results: IMovie[]; total_pages: number }> {
    const url = `${environment.pathUrl}discover/movie?api_key=${environment.apiKey}&with_genres=${genreId}&page=${page}`;
    return this.http.get<{ results: IMovie[]; total_pages: number }>(url);
  }

}

import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IMovie } from '../Models/imovie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'bcad6a5fd95f7448a5012ec53ec75177';

  // Signal to hold the current movie ID
  movieId = signal(11);

  // Resource created at the top level, using the signal
  movieByIdResource = httpResource<IMovie>(
    () => `https://api.themoviedb.org/3/movie/${this.movieId()}?api_key=${this.apiKey}`,
    { defaultValue: {} as IMovie }
  );
<<<<<<< Updated upstream
=======
  popularMovies = httpResource<{ results: IMovie[] }>(
    () => `${environment.pathUrl}movie/popular?api_key=${environment.apiKey}`,
    { defaultValue: { results: [] } }
  );
  getMoviesByPage(page: number): Observable<IMovieListResponse> {
    const url = `${environment.pathUrl}movie/popular?api_key=${environment.apiKey}&page=${page}`;
    return this.http.get<IMovieListResponse>(url);
  }
  searchMovies(query: string): Observable<{ results: IMovie[] }> {
    return this.http.get<{ results: IMovie[] }>(
      `${environment.pathUrl}search/movie?query=${query}&api_key=${environment.apiKey}`
    );
  }
>>>>>>> Stashed changes
}

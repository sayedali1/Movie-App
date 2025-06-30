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
  // private apiKey = 'bcad6a5fd95f7448a5012ec53ec75177';

  // Signal to hold the current movie ID
  movieId = signal(11);

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
}

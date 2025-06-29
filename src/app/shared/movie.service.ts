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
}

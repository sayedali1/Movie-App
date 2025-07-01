import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pagination } from '../pagination/pagination';
import { Search } from '../search/search';

import { MovieService } from '../../shared/movie.service';
import { GenreDropdown } from '../genre-dropdown/genre-dropdown';

@Component({
  selector: 'app-home-componant',
  imports: [RouterModule, Pagination, Search, GenreDropdown],
  templateUrl: './home-componant.html',
  styleUrl: './home-componant.css',
})
export class HomeComponant {
  MovieService = inject(MovieService);

  constructor() {
    // effect(() => {
    //   const loading = this.MovieService.popularMovies.isLoading();
    //   const movies = this.MovieService.popularMovies.value().results;
    //   if (!loading && movies.length) {
    //     console.log('Popular Movies:', movies);
    //   }
    // });

    effect(() => {
      if (this.MovieService.popularMoviesResource.hasValue()) {
        const movies = this.MovieService.popularMoviesResource.value();
        console.log('Popular Movies:', movies);
      } else {
        console.log('Loading popular movies...');
      }

      if (this.MovieService.MovieByGenreResource.hasValue()) {
        const moviesByGenre = this.MovieService.MovieByGenreResource.value();
        console.log('Movies by Genre:', moviesByGenre);
      }
    });
  }
}

import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pagination } from '../pagination/pagination';
import { Search } from '../search/search';

@Component({
  selector: 'app-home-componant',
  imports: [RouterModule, Pagination, Search],
  templateUrl: './home-componant.html',
  styleUrl: './home-componant.css',
})
export class HomeComponant {
  MovieService: any;

  constructor() {
    effect(() => {
      const loading = this.MovieService.popularMovies.isLoading();
      const movies = this.MovieService.popularMovies.value().results;
      if (!loading && movies.length) {
        console.log('Popular Movies:', movies);
      }
    });
  }
}

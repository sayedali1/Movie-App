import { Component, effect } from '@angular/core';

@Component({
  selector: 'app-home-componant',
  imports: [],
  templateUrl: './home-componant.html',
  styleUrl: './home-componant.css'
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

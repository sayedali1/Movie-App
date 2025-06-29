import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-componant',
  imports: [RouterModule],
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

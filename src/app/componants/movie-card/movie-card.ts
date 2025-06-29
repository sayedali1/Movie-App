import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard  {

  movieService = inject(MovieService);

  constructor() {
     this.movieService.movieId.set(11); // To change the movie
  }

   
   
  
}

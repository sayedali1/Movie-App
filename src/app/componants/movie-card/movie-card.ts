import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { CommonModule } from '@angular/common';

declare const AOS: any; // Add this if you get a TS error about AOS

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard implements OnInit {
  movieService = inject(MovieService);
  isFavorite = false;

  constructor() {
    this.movieService.movieId.set(11); // To change the movie
  }

  ngOnInit() {
    AOS.init(); // Initialize AOS for animations
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}

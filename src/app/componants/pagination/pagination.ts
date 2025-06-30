import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { MovieCard } from '../movie-card/movie-card';
import { IMovie } from '../../Models/imovie';

@Component({
  selector: 'app-pagination',
  imports: [MovieCard],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination implements OnInit {
  movies: IMovie[] = [];
  currentPage = 1;
  totalPages = 10; // مبدئيًا، ممكن تعيّنه بعد أول استدعاء API

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMoviesByPage(this.currentPage).subscribe({
      next: (res) => {
        this.movies = res.results;
        this.totalPages = res.total_pages;
      },
      error: (err) => console.error(err),
    });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies();
    }
  }
}

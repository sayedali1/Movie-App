import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { MovieCard } from '../movie-card/movie-card';
import { IMovie } from '../../Models/imovie';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [MovieCard, CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination implements OnInit {
  movies: IMovie[] = [];
  currentPage = 1;
  totalPages = 10;

  constructor(private movieService: MovieService, private router: Router) {}

  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }
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

  get paginationRange(): number[] {
    const maxVisible = 10;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = start + maxVisible - 1;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMovies();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { IMovie } from '../../Models/imovie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { MovieSummaryCard } from '../movie-summary-card/movie-summary-card';
import { CommonModule } from '@angular/common';
import { IGenre } from '../../Models/igenre';
import { GenreDropdown } from '../genre-dropdown/genre-dropdown';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-genre-movies',
  standalone: true,
  imports: [MovieSummaryCard, CommonModule, GenreDropdown, MovieCard],
  templateUrl: './genre-movies.html',
  styleUrl: './genre-movies.css',
})
export class GenreMovies implements OnInit {
  movies: IMovie[] = [];
  genreName = '';
  genreId: number = 0;
  currentPage = 1;
  totalPages = 0;
  loading = false;
  paginationRange: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.genreId = +params['id'] || 0;
      this.currentPage = +params['page'] || 1;

      if (this.genreId) {
        this.getGenreName(this.genreId);
        this.getMoviesByGenre(this.genreId, this.currentPage);
      }
    });
  }

  getGenreName(id: number) {
    this.movieService.getAllGenres().subscribe((genres) => {
      const match = genres.find((g) => g.id === id);
      this.genreName = match ? match.name : 'Unknown Genre';
    });
  }

  getMoviesByGenre(id: number, page: number) {
    this.loading = true;
    this.movieService.getMoviesByGenreWithPagination(id, page).subscribe({
      next: (res) => {
        this.movies = res.results;
        this.totalPages = res.total_pages;
        this.updatePaginationRange();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching movies by genre:', err);
        this.loading = false;
      },
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate(['/genre'], {
        queryParams: { id: this.genreId, page },
      });
    }
  }

  updatePaginationRange() {
    const maxVisible = 10;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = start + maxVisible - 1;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    this.paginationRange = [];
    for (let i = start; i <= end; i++) {
      this.paginationRange.push(i);
    }
  }

  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }
}

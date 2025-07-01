import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../../Models/imovie';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { Search } from '../search/search';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { MovieSummaryCard } from '../movie-summary-card/movie-summary-card';

@Component({
  selector: 'app-search-result',
  imports: [CommonModule, Search, MovieSummaryCard],
  templateUrl: './search-result.html',
  styleUrl: './search-result.css',
})
export class SearchResult implements OnInit {
  searchQuery: string = '';
  searchResults: IMovie[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pages: number[] = [];
  loading = false;
  visiblePages: number[] = [];
  maxVisible = 10;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      const pageParam = Number(params['page']) || 1;

      if (this.searchQuery.trim()) {
        this.fetchSearchResults(this.searchQuery, pageParam);
      } else {
        this.fetchPopularMovies(pageParam);
      }
    });
  }

  handleSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    history.replaceState({}, '', `/search?q=${query}&page=1`);
    this.fetchSearchResults(query, 1);
  }

  updateVisiblePages() {
    const start =
      Math.floor((this.currentPage - 1) / this.maxVisible) * this.maxVisible +
      1;
    const end = Math.min(start + this.maxVisible - 1, this.totalPages);
    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  fetchSearchResults(query: string, page: number = 1) {
    this.loading = true;
    this.movieService.searchMovies(query, page).subscribe({
      next: (res) => {
        this.searchResults = res.results || [];
        this.totalPages = res.total_pages;
        this.currentPage = res.page;

        this.updateVisiblePages();
        this.loading = false;
      },
      error: (err) => {
        console.error('Search API Error:', err);
        this.loading = false;
      },
    });
  }
  fetchPopularMovies(page: number = 1) {
    this.loading = true;
    this.movieService.getMoviesByPage(page).subscribe({
      next: (res) => {
        this.searchResults = res.results || [];
        this.totalPages = res.total_pages;
        this.currentPage = res.page;
        this.updateVisiblePages();
        this.loading = false;
      },
      error: (err) => {
        console.error('Popular Movies Error:', err);
        this.loading = false;
      },
    });
  }

  goToPage(page: number) {
    history.replaceState({}, '', `/search?q=${this.searchQuery}&page=${page}`);

    if (this.searchQuery.trim()) {
      this.fetchSearchResults(this.searchQuery, page);
    } else {
      this.fetchPopularMovies(page);
    }
  }

  goToPrevSet() {
    const prevPage = this.visiblePages[0] - 1;
    if (prevPage >= 1) {
      this.goToPage(prevPage);
    }
  }

  goToNextSet() {
    const nextPage = this.visiblePages[this.visiblePages.length - 1] + 1;
    if (nextPage <= this.totalPages) {
      this.goToPage(nextPage);
    }
  }
}

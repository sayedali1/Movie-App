import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { IMovie } from '../../Models/imovie';
import { Search } from '../search/search';
import { MovieSummaryCard } from '../movie-summary-card/movie-summary-card';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, Search, MovieCard],
  templateUrl: './search-result.html',
  styleUrls: ['./search-result.css'],
})
export class SearchResult implements OnInit {
  searchQuery = '';
  searchResults: IMovie[] = [];
  loading = false;

  // pagination state
  totalPages = 0;
  currentPage = 1;
  maxVisible = 10;
  visiblePages: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.currentPage = +(params['page'] || 1);
      this.loadPage(this.currentPage);
    });
  }

  handleSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    history.replaceState({}, '', `/search?q=${query}&page=1`);
    this.loadPage(1);
  }

  private loadPage(page: number) {
    this.loading = true;
    const obs = this.searchQuery.trim()
      ? this.movieService.searchMovies(this.searchQuery, page)
      : this.movieService.getMoviesByPage(page);

    obs.subscribe({
      next: (res) => {
        this.searchResults = res.results || [];
        this.totalPages = res.total_pages;
        this.currentPage = res.page;
        this.updateVisiblePages();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    history.replaceState({}, '', `/search?q=${this.searchQuery}&page=${page}`);
    this.loadPage(page);
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

  get paginationRange(): number[] {
    return this.visiblePages;
  }

  goToPrevSet() {
    const prev = this.visiblePages[0] - 1;
    if (prev >= 1) this.goToPage(prev);
  }

  goToNextSet() {
    const next = this.visiblePages[this.visiblePages.length - 1] + 1;
    if (next <= this.totalPages) this.goToPage(next);
  }
}

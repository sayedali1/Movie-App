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
  imports: [CommonModule, MovieCard, Search, MovieSummaryCard],
  templateUrl: './search-result.html',
  styleUrl: './search-result.css',
})
export class SearchResult implements OnInit {
  searchQuery: string = '';
  searchResults: IMovie[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.fetchSearchResults(this.searchQuery);
      }
    });
  }

  handleSearch(query: string) {
    this.searchQuery = query;
    history.replaceState({}, '', `/search?q=${query}`);
    this.fetchSearchResults(query);
  }

  fetchSearchResults(query: string) {
    this.loading = true;
    this.movieService.searchMovies(query).subscribe({
      next: (res) => {
        this.searchResults = res.results || [];
        console.log('Search Results:', this.searchResults);
        this.loading = false;
      },
      error: (err) => {
        console.error('Search API Error:', err);
        this.loading = false;
      },
    });
  }
}

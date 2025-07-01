import { Component, inject, signal } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { Router } from '@angular/router';
import { IGenre } from '../../Models/igenre';

@Component({
  selector: 'app-genre-dropdown',
  imports: [],
  templateUrl: './genre-dropdown.html',
  styleUrl: './genre-dropdown.css',
})
export class GenreDropdown {
  private movieService = inject(MovieService);
  private router = inject(Router);

  selectedGenreId = signal<number | null>(null);
  genres = signal<IGenre[]>([]);

  constructor() {
    this.movieService.getGenres().subscribe({
      next: (res) => this.genres.set(res.genres),
      error: (err) => console.error('Error loading genres', err),
    });
  }

  onGenreSelect(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    if (!isNaN(id)) {
      this.selectedGenreId.set(id);
      this.router.navigate(['/genre'], { queryParams: { id, page: 1 } });
    }
  }
}

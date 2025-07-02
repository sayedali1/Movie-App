import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { Router } from '@angular/router';
import { IGenre } from '../../Models/igenre';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-dropdown',
  imports: [CommonModule],
  templateUrl: './genre-dropdown.html',
  styleUrl: './genre-dropdown.css',
})
export class GenreDropdown implements OnInit {
  private movieService = inject(MovieService);
  private router = inject(Router);

  genres = signal<IGenre[]>([]);
  isOpen = signal<boolean>(false); // الحالة الرئيسية

  ngOnInit(): void {
    this.movieService.getAllGenres().subscribe({
      next: (genres) => this.genres.set(genres),
      error: (err) => console.error('Error loading genres', err),
    });
  }

  toggleGenres() {
    this.isOpen.update((v) => !v);
  }

  selectGenre(id: number) {
    this.router.navigate(['/genre'], { queryParams: { id, page: 1 } });
    this.isOpen.set(false); // 👈 يغلق القائمة بعد الاختيار
  }
}

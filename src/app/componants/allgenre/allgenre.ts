import { Component, inject } from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { IGenre } from '../../Models/igenre';
import { IMovie } from '../../Models/imovie';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allgenre',
  imports: [CommonModule, MovieCard],
  templateUrl: './allgenre.html',
  styleUrl: './allgenre.css',
})
export class Allgenre {
  Moivservice = inject(MovieService);

  genresWithMovies$!: Observable<{ genre: IGenre; movies: IMovie[] }[]>;
  constructor(private router: Router) {
    this.genresWithMovies$ = this.Moivservice.getAllGenresWithMovies();
  }

  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }
}

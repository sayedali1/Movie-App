import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { IMovie } from '../../Models/imovie';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {
  movie: IMovie | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id')); // <-- lowercase 'id'

    this.movieService.getMovieById(id).subscribe({
      next: (data) => {
        this.movie = data;
        console.log(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching movie:', err);
        this.loading = false;
      },
    });
  }
}

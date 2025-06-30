import {
  Component,
  effect,
  Inject,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { IMovie } from '../../Models/imovie';
import { WishlistService } from '../../shared/wishlist.service';

declare const AOS: any; // Add this if you get a TS error about AOS

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  movieService = inject(MovieService);
  isFavorite = false;
  @Input() movie?: IMovie;
  wishlistService = inject(WishlistService);

  constructor() {
    this.movieService.movieId.set(11);
    // Reactively update movie when data is loaded
    effect(() => {
      if (!this.movieService.movieByIdResource.isLoading()) {
        this.movie = this.movieService.movieByIdResource.value();
        console.log('Movie data:', this.movie);
      }
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite && this.movie) {
      this.wishlistService.addToWishlist(this.movie);
    } else if (this.movie) {
      this.wishlistService.removeFromWishlist(this.movie);
    }
    console.log('Favorite status:', this.wishlistService.items());
  }
}

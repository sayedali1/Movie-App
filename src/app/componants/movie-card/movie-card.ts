import {
  Component,
  effect,
  Inject,
  inject,
  Input,
  Output,
  EventEmitter,
  computed,
} from '@angular/core';
import { MovieService } from '../../shared/movie.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { IMovie } from '../../Models/imovie';
import { WishlistService } from '../../shared/wishlist.service';
import { GenreDropdown } from '../genre-dropdown/genre-dropdown';

declare const AOS: any; // Add this if you get a TS error about AOS

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  movieService = inject(MovieService);
  wishlistService = inject(WishlistService);
  @Input() movie?: IMovie;
  @Output() toggleWishlist = new EventEmitter<number>();
  isInWishlist = computed(() =>
    this.movie ? this.wishlistService.isInWishlist(this.movie.id) : false
  );

  constructor() {}

  toggleWishlistStatus(): void {
    if (!this.movie) return;
    if (this.isInWishlist()) {
      this.wishlistService.removeFromWishlist(this.movie.id);
    } else {
      this.wishlistService.addToWishlist(this.movie);
    }
    this.toggleWishlist.emit(this.movie.id);
  }

  @Output() cardClicked = new EventEmitter<number>();

  onClick() {
    this.cardClicked.emit(this.movie?.id);
  }
}

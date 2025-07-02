import {
  Component,
  Input,
  inject,
  Output,
  EventEmitter,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovieSummary } from '../../Models/imovie-summary';
import { WishlistService } from '../../shared/wishlist.service';
import { IMovie } from '../../Models/imovie';

@Component({
  selector: 'app-movie-summary-card',
  imports: [CommonModule],
  templateUrl: './movie-summary-card.html',
  styleUrl: './movie-summary-card.css',
})
export class MovieSummaryCard {
  @Input() movie!: IMovie;
  @Output() toggleWishlist = new EventEmitter<number>();

  wishlistService = inject(WishlistService);

  isInWishlist = computed(() =>
    this.movie ? this.wishlistService.isInWishlist(this.movie.id) : false
  );

  toggleWishlistStatus(): void {
    if (!this.movie) return;

    if (this.isInWishlist()) {
      this.wishlistService.removeFromWishlist(this.movie.id);
    } else {
      this.wishlistService.addToWishlist(this.movie);
    }

    this.toggleWishlist.emit(this.movie.id);
  }
}

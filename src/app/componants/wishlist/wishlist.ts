import { Component,computed} from '@angular/core';
import { WishlistService } from '../../shared/wishlist.service';
import { MovieCard } from '../movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [MovieCard,CommonModule,RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
  
  wishlistMovies = computed(() => this.wishlistService.wishlistSignal());

  constructor(private wishlistService: WishlistService) {}

  removeFromWishlist(movieId: number): void {
    this.wishlistService.removeFromWishlist(movieId);
  }
}

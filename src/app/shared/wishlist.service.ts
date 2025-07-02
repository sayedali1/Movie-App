import { Injectable,signal, computed} from '@angular/core';
import { IMovie } from '../Models/imovie';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
private wishlist = signal<IMovie[]>([]);
  wishlistSignal = this.wishlist.asReadonly();
  wishlistCount = computed(() => this.wishlist().length);

  constructor() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlist.set(JSON.parse(savedWishlist));
    }
  }

  addToWishlist(movie: IMovie ): void {
    this.wishlist.update(current => {
      if (!current.some(m => m.id === movie.id)) {
        const updatedWishlist = [...current, movie];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        return updatedWishlist;
      }
      return current;
    });
  }

  removeFromWishlist(movieId: number): void {
    this.wishlist.update(current => {
      const updatedWishlist = current.filter(m => m.id !== movieId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlist().some(m => m.id === movieId);
  }
}

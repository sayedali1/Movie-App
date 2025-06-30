import { computed, Injectable, signal, Signal } from '@angular/core';
import { IMovie } from '../Models/imovie';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlist= signal<IMovie[]>([])

  items = computed(() => this.wishlist());

  addToWishlist(movie: IMovie) {
    this.wishlist.update(wishlist => [...wishlist, movie]);
  }

  removeFromWishlist(movie: IMovie) {
    this.wishlist.update(wishlist => wishlist.filter(m => m.id !== movie.id));
  }
}

import {
  Component,
  HostListener,
  inject,
  computed,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../../shared/wishlist.service';
import { ThemeService } from '../../shared/theme-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar  {
  wishlistService = inject(WishlistService);
  theme = inject(ThemeService);

  opacity = signal(1);
  isMenuOpen = signal(false);

  // ✅ استخدم computed علشان تتحدث فورًا في التمبلت
  isDarkMode = computed(() => this.theme.isDarkSignal());
  darkIconClass = computed(() =>
  this.theme.isDarkSignal() ? 'far fa-sun text-black' : 'far fa-moon text-white'
  );
  // ngOnInit(): void {
  //   this.theme.init();
  // }

  toggleTheme(): void {
    this.theme.toggle();
    console.log('Theme toggled:', this.theme.isDarkSignal());
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const y = window.scrollY || window.pageYOffset;
    this.opacity.set(Math.max(1 - y / 300, 0.8));
  }

  navbarBackground(): string {
    return this.isDarkMode()
      ? 'rgba(17,24,39,0.8)'
      : `rgba(0,0,0,${this.opacity()})`;
  }
}

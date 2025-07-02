import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-back-top',
  imports: [CommonModule],
  templateUrl: './back-top.html',
  styleUrl: './back-top.css',
})
export class BackTop {
  showButton = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showButton.set(scrollY > 0);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  opacity = 1;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    // Adjust 200 to control how fast it fades
    this.opacity = Math.max(1 - scrollY / 200, 0.8); // Never less than 0.5
  }
}

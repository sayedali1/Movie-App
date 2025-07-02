import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = signal<boolean>(false);

  constructor() {
    const saved = localStorage.getItem('theme');
    this.isDarkMode.set(saved === 'dark');
    this.applyTheme();
  }

  get isDarkSignal() {
    return this.isDarkMode;
  }

  isDark() {
    return this.isDarkMode();
  }

  toggle() {
    this.isDarkMode.update((v) => !v);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    this.applyTheme();
  }

  init() {
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

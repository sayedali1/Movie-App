import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = signal<boolean>(false);

  constructor() {
    const saved = localStorage.getItem('theme') ?? 'light';
    this.isDarkMode.set(saved === 'dark');
  }

  get isDarkSignal() {
    return this.isDarkMode;
  }

  isDark() {
    return this.isDarkMode();
  }

  toggle() {
    this.isDarkMode.update(v => !v);
    const newTheme = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);

    // Immediately apply class to <html>
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

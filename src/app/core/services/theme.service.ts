import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  toggleTheme(): void {

    const html = document.documentElement;

    const current = html.getAttribute('data-bs-theme');

    html.setAttribute(
      'data-bs-theme',
      current === 'dark'
        ? 'light'
        : 'dark'
    );
  }

  setDark(): void {
    document.documentElement
      .setAttribute('data-bs-theme', 'dark');
  }
}

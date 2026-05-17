import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../core/services/theme.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  titulo = "";
  constructor(private readonly themeService: ThemeService, private title: Title) {
    this.titulo = title.getTitle()
   }
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

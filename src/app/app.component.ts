import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent,   RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hitbox-admin';
  collapsed = false;
  mobileOpen = false;

  toggleTheme(): void {

    const html = document.documentElement;

    const current =
      html.getAttribute('data-bs-theme');

    html.setAttribute(
      'data-bs-theme',
      current === 'dark'
        ? 'light'
        : 'dark'
    );
  }
  toggleMobileMenu() {
    this.mobileOpen = !this.mobileOpen;
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  @HostListener('window:resize')
  handleResize() {
    if (window.innerWidth < 992) {
      this.collapsed = false;
    }
  }

}

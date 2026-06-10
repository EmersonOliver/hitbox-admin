import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeService } from '../core/services/theme.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenService } from '../core/auth/guards/token.service';
import { ProfileService } from '../core/profile/profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


  userName = '';
  firstName = '';
  companyName = '';
  role = '';

  titulo = "";


  constructor(private readonly themeService: ThemeService,
    private router: Router,
    private tokenService: TokenService,
    private profileService: ProfileService,
    private title: Title) {
    this.titulo = title.getTitle()

  }
  ngOnInit(): void {
    this.firstName = this.tokenService.getUserName();
    this.userName =
      this.tokenService.getFullName();

    this.companyName =
      this.tokenService.getCompanyName();


    this.profileService.loadProfile().subscribe({
      next: profile => {

        this.firstName =
          profile.name;

        this.role =
          this.formatRole(profile.role);

        this.profileService.profileResponse = profile;
      }
    })
  }


  private formatRole(role: string): string {

    switch (role) {

      case 'ROLE_OWNER':
      case 'OWNER':
        return 'Administrador';

      case 'ROLE_MANAGER':
      case 'MANAGER':
        return 'Gerente';

      case 'ROLE_USER':
      case 'USER':
        return 'Usuário';

      default:
        return role;
    }
  }

  get initials(): string {

    const name =
      this.tokenService.getFullName();

    if (!name) {
      return 'HS';
    }

    return name
      .split(' ')
      .filter(x => x)
      .slice(0, 2)
      .map(x => x[0].toUpperCase())
      .join('');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  myProfile() {
    this.router.navigate(['/profile'])
  }
  changePassword() {
    this.router.navigate(['/profile/change-password'])
  }
  logout() {
    this.router.navigate(['/']);
    localStorage.removeItem('token')
  }
  settings() {
    this.router.navigate(['/profile/settings'])
  }

  teams() {
    this.router.navigate(['profile/teams'])
  }
  permissions() {
    this.router.navigate(['profile/teams/permissions'])
  }
  myCompany() {
    this.router.navigate(['profile/settings/company'])
  }

  resetTutorial() {
    localStorage.removeItem('tour_completed_relsidebar')
    this.router.navigate(['dashboard']);
  }
}

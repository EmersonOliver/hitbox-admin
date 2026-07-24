import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../core/auth/guards/token.service';
import { ProfileService } from '../../core/profile/profile.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  constructor(private tokenService: TokenService,
    private fb: FormBuilder,
    public title: Title,
    public profileService: ProfileService
  ) {
    this.title.setTitle('ERSO ERP - Profile')
    let profile = profileService?.profileResponse;
    this.form = fb.group({
      id: [profile?.id],
      name: [profile?.name, Validators.required],
      lastname: [null, Validators.required],
      phone: [profile?.phone, Validators.required],
      fullName: [profile?.fullName],
      email: [profile?.email, Validators.required],
      role: [profile?.role, Validators.required],
      active: [profile?.active],
      company: fb.group({
        id: [profile?.company.id],
        name: [profile?.company.name]
      })
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      let profile = this.profileService?.profileResponse;
      this.form = this.fb.group({
        id: [profile?.id],
        name: [profile?.name, Validators.required],
        lastname: [profile?.lastname],
        fullName: [profile?.fullName],
        email: [profile?.email, Validators.required],
        phone: [profile?.phone, Validators.required],
        role: [profile?.role, Validators.required],
        active: [profile?.active],
        company: this.fb.group({
          id: [profile?.company.id],
          name: [profile?.company.name]
        })
      });
    }, 100);
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

  public formatRole(role: string): string {

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
}

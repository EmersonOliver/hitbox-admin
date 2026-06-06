import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {



  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    console.log('Login');
    this.authService.login(this.form.getRawValue()).subscribe({
      next: response => {
        if (response.companyId == null) {
          this.router.navigate(['/create-company']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })

  }

}

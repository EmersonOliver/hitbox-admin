import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ToastService } from '../components/toast/toast.service';
import { ToastComponent } from "../components/toast/toast.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: FormGroup;
  constructor(private fb: FormBuilder,
    private toast: ToastService,
    private router: Router, private authService: AuthService) {
    this.form = fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    this.authService.login(this.form.getRawValue()).subscribe({
      next: response => {
        if (response.companies.length == 0) {
          this.router.navigate(['/create-company']);
        } else {
          this.router.navigate(['/select-company']);
        }
      },
      error: (error) => {
        this.toast.show('Ocorreu um erro. ' + error.error.message, 'danger');
      }
    })
  }

}

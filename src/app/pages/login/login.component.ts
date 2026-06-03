import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {



  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      usuario: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    console.log('Login')
    this.router.navigate(['/dashboard'])
  }

}

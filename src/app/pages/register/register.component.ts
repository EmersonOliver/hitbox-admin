import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {


  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  register() {

    this.userService.createFirstUser(this.form.getRawValue()).subscribe({
      next: response => {
        alert('Criado com sucesso!')
        this.form.reset();
      },
      error: (error) => {
        alert('Ocorreu um erro ' + error.error.message)
      }
    })

  }

}

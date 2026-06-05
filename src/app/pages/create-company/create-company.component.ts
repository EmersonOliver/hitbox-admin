import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {
save() {
throw new Error('Method not implemented.');
}
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      tradeName: [''],
      cnpj: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      slug: ['', Validators.required],
      planType: ['FREE', Validators.required]
    });
  }
}

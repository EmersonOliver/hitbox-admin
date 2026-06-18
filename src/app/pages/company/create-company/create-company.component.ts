import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyService } from '../../../core/company/company.service';
import { TokenService } from '../../../core/auth/guards/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {

  form: FormGroup;
  constructor(private fb: FormBuilder, private companyService: CompanyService,
    private router: Router,
    private tokenService: TokenService) {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      tradeName: [''],
      document: [''],
      documentType: ['NONE'],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      slug: ['', Validators.required],
      planType: ['FREE', Validators.required]
    });
  }

  save() {
    this.companyService.createCompany(this.form.getRawValue()).subscribe({
      next: response => {

        this.tokenService.setToken(response.token);
      this.router.navigate(['/workspace-setup']);

      }
    })
  }


}

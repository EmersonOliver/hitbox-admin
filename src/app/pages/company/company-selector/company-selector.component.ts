import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../../core/auth/guards/token.service';
import { Company } from '../models/company.model';
import { CompanyService } from '../../../core/company/company.service';
import { SelectCompanyRequest } from '../models/company.selected.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './company-selector.component.html',
  styleUrl: './company-selector.component.scss'
})
export class CompanySelectorComponent implements OnInit {

  companies: any[] = [];

  constructor(
    private tokenService: TokenService,
    private companyService: CompanyService,
    private router: Router) {

  }
  ngOnInit(): void {
    const companies = this.tokenService.getCompanies()
    this.companies = companies;
  }

  createCompany() {
    throw new Error('Method not implemented.');
  }
  selectCompany(company: Company) {
    let payload: SelectCompanyRequest = {
      companyId: company.companyId,
      userId: this.tokenService.getSub()
    }
    this.companyService.selectCompany(payload).subscribe({
      next: response => {
        this.tokenService.setToken(response.token);
        this.router.navigate(['/dashboard'])
      }
    });
  }
}

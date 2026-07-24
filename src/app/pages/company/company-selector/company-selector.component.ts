import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../../core/auth/guards/token.service';
import { Company } from '../models/company.model';
import { CompanyService } from '../../../core/company/company.service';
import { SelectCompanyRequest } from '../models/company.selected.request';
import { Router } from '@angular/router';
import { CompanySelectedResponse } from '../models/company.selected.response';
import { Title } from '@angular/platform-browser';

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
    public title: Title,
    private router: Router) {
    this.title.setTitle('ERSO ERP - Selecionar Empresa');

  }
  ngOnInit(): void {

    this.loadCompaniesByUser();
  }

  createCompany() {

  }

  loadCompaniesByUser() {
    const userId = this.tokenService.getSub();

    const companies = this.tokenService.getCompanies()
    if (!companies) {
      this.companies = companies;
    }
    this.companyService.loadCompanyByUser(userId).subscribe({
      next: (response) => {
        this.companies = response
      }
    })

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

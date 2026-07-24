import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PricingRuleService } from '../../../core/pricing/services/pricing-rule.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-calc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './dashboard-calc.component.html',
  styleUrl: './dashboard-calc.component.scss'
})
export class DashboardCalcComponent implements OnInit {

  pricingRules: any[] = [];
  activeRules: number = 10;
  averageMargin: number = 100;
  lastUpdate: string = '30/06/2026';

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  pages: number[] = [];

  constructor(private pricingRuleService: PricingRuleService, public title:Title) {
     this.title.setTitle('ERSO ERP - Cálculos');
   }
  ngOnInit(): void {
    this.loadPricingRules();
  }

  loadPricingRules() {
    this.pricingRuleService.getPage(0, 10).subscribe({
      next: response => {

        this.pricingRules =
          response.content;

        this.calculateMetrics();

        this.totalPages =
          response.totalPages;


        this.pages =
          Array.from(
            { length: this.totalPages },
            (_, index) => index
          );
      }
    })
  }

  private calculateMetrics(): void {

    this.activeRules =
      this.pricingRules
        .filter(rule => rule.active)
        .length;

    this.averageMargin =
      this.pricingRules.length === 0
        ? 0
        : this.pricingRules.reduce(
          (acc, rule) =>
            acc + (rule.profitMargin ?? 0),
          0
        ) / this.pricingRules.length;

    const latest =
      this.pricingRules
        .sort((a, b) =>
          new Date(b.lastUpdate).getTime() -
          new Date(a.lastUpdate).getTime()
        )[0];


    this.lastUpdate =
      latest
        ? new Date(latest.lastUpdate)
          .toLocaleDateString('pt-BR')
        : '-';


  }
  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages - 1
    ) {

      this.currentPage++;

      this.loadPricingRules();
    }
  }

  previousPage(): void {

    if (
      this.currentPage > 0
    ) {

      this.currentPage--;

      this.loadPricingRules();
    }
  }

  goToPage(
    page: number
  ): void {

    this.currentPage = page;

    this.loadPricingRules();
  }
}

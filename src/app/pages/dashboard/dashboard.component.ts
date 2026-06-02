import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RangeDatepickerComponent } from "../components/datepicker/range-datepicker.component";
import { RatingComponent } from '../components/rating/rating.component';
import { StockProgressComponent } from "../components/stock-progress/stock-progress.component";
import { Router, RouterLink } from "@angular/router";
import { TutorialService } from '../../core/tutorial/tutorial.service';
import { DASHBOARD_TOUR } from '../../core/tutorial/tours/dashboard.tour';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RangeDatepickerComponent, RatingComponent, StockProgressComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  rating = 0;
  cards = [
    {
      title: 'Receita Total',
      value: 'R$ 12.580,90',
      icon: 'bi-currency-dollar'
    },
    {
      title: 'Custo de Produção',
      value: 'R$ 4.235,40',
      icon: 'bi-cart'
    },
    {
      title: 'Lucro Líquido',
      value: 'R$ 8.345,50',
      icon: 'bi-graph-up-arrow'
    },
    {
      title: 'Margem de Lucro',
      value: '66,3%',
      icon: 'bi-percent'
    }
  ];
  constructor(private title: Title, private router: Router, private tutorialService: TutorialService) {
    title.setTitle('Hitbox - Dashboard')
  }
  ngAfterViewInit(): void {
    if (!localStorage.getItem('tour_completed_relsidebar')) {
      this.tutorialService.startTour(
        DASHBOARD_TOUR
      );
    }
  }
  ngOnInit(): void {

  }

  clickRouterLink(link: string) {
    this.router.navigate([link])
  }
}

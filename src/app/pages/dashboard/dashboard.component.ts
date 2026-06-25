import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RangeDatepickerComponent } from "../components/datepicker/range-datepicker.component";
import { RatingComponent } from '../components/rating/rating.component';
import { StockProgressComponent } from "../components/stock-progress/stock-progress.component";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { TutorialService } from '../../core/tutorial/tutorial.service';
import { DASHBOARD_TOUR } from '../../core/tutorial/tours/dashboard.tour';
import { DashboardService } from '../../core/dashboard/dashboard.service';
import { DashboardResponse } from './models/dashboard.model';
import { ImageService } from '../../core/image/image.service';
import { InventoryModel } from '../inventory/components/inventory-modal/models/inventory.model';
import { ProductModalViewerComponent } from "./components/product-modal-viewer/product-modal-viewer.component";
import { ProductDashboardResponse } from './models/product-dashboard.model';
import { InventoryModalViewerComponent } from "./components/inventory-modal-viewer/inventory-modal-viewer.component";
import { InventoryDashboardResponse } from './models/inventory-dashboard.model';
import { ToastService } from '../components/toast/toast.service';
declare var bootstrap: any;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RangeDatepickerComponent, RatingComponent, StockProgressComponent, RouterModule, ProductModalViewerComponent, InventoryModalViewerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  rating = 0;

  dashboard?: DashboardResponse;
  productDashboard?: ProductDashboardResponse;
  inventoryDashboard?: InventoryDashboardResponse;
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
  constructor(private title: Title,
    private router: Router,
    private toast: ToastService,
    private tutorialService: TutorialService,
    private dashboardService: DashboardService,
    private imageService: ImageService) {
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

    this.dashboardService.dashboard().subscribe({
      next: response => {
        this.dashboard = response;
        setTimeout(() => {
          this.loadImages();
        }, 100);
      }, error: (error) => {
        this.toast.show('Ocorreu um erro!' + error.error.message, 'danger')
      }
    })

  }

  clickRouterLink(link: string) {
    this.router.navigate([link])
  }
  loadProductDashboard(id: number) {

    this.dashboardService.productDashboard(id).subscribe({
      next: response => {
        this.productDashboard = response;
        this.imageService
          .load(this.productDashboard.product.imageUrl)
          .subscribe(url => {
            this.productDashboard!.product.imagePreview = url;
            const modal =
              new bootstrap.Modal(
                document.getElementById(
                  'productViewerModal'
                )
              );
            setTimeout(() => {
              modal.show();
            }, 0);

          });

      }
    })

  }
  loadInventoryDashboard(id?: number) {
    this.dashboardService.inventoryDashboard(id).subscribe({
      next: response => {
        this.inventoryDashboard = response;
        this.imageService
          .load(this.inventoryDashboard.inventory.imageUrl)
          .subscribe(url => {
            this.inventoryDashboard!.inventory.imagePreview = url;
            const modal =
              new bootstrap.Modal(
                document.getElementById(
                  'inventoryViewerModal'
                )
              );
            setTimeout(() => {
              modal.show();
            }, 0);

          });
      }
    })

  }
  private loadImages(): void {
    if (this.dashboard?.topProducts) {
      this.dashboard?.topProducts.forEach(item => {
        this.imageService
          .load(item.product.imageUrl)
          .subscribe(url => {
            item.product.imagePreview = url;
          });
      });
    }

    if (this.dashboard?.topInventorys) {
      this.dashboard?.topInventorys.forEach(item => {
        this.imageService
          .load(item.imageUrl)
          .subscribe(url => {
            item.imagePreview = url;
          });
      })

    }

  }

  getStockPercentage(
    item: InventoryModel
  ): number {

    if (!item.quantity || item.quantity <= 0) {
      return 0;
    }

    const percentage =
      (item.quantity / item.minimumStock) * 100;

    return Math.min(
      Math.max(percentage, 0),
      100
    );
  }
  getStockStatus(item: any): string {

    if (item.quantity <= 0) {
      return 'OUT';
    }

    if (item.quantity <= item.minimumStock) {
      return 'LOW';
    }

    return 'OK';
  }

  getStockVariant(
    item: any
  ): string {

    const percentage =
      this.getStockPercentage(item);

    if (percentage <= 30) {

      return 'danger';
    }

    if (percentage <= 60) {

      return 'warning';
    }

    return 'success';
  }
  // getStockPercentage(
  //   item: InventoryModel
  // ): number {

  //   if (!item.quantity || item.quantity <= 0) {
  //     return 0;
  //   }

  //   const percentage =
  //     (item.quantity / item.minimumStock) * 100;

  //   // return Math.min(
  //   //   Math.max(percentage, 0),
  //   //   100
  //   // );
  //   return Number(
  //   percentage.toFixed(2)
  // );
  // }

}

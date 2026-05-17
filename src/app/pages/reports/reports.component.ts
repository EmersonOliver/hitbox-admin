import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './reports.component.html',

  styleUrl:
    './reports.component.scss'
})
export class ReportsComponent
implements AfterViewInit {

  @ViewChild('salesChart')
  salesChartRef!: ElementRef;

  salesChart!: Chart;

  /* =====================================================
     KPIS
  ===================================================== */

  totalRevenue = 12540;

  totalProfit = 6420;

  totalOrders = 184;

  averageMargin = 51;

  /* =====================================================
     TABLES
  ===================================================== */

  topProducts = [

    {
      name: 'Chaveiro Mario',
      sales: 120,
      revenue: 2450
    },

    {
      name: 'Imã Minecraft',
      sales: 90,
      revenue: 1800
    },

    {
      name: 'Switch Keychain',
      sales: 72,
      revenue: 1580
    }
  ];

  criticalStock = [

    {
      name: 'PLA Preto',
      quantity: 120,
      minimum: 300
    },

    {
      name: 'Switch Azul',
      quantity: 10,
      minimum: 40
    }
  ];

  ngAfterViewInit(): void {

    this.createSalesChart();
  }

  createSalesChart(): void {

    const isDark =
      document.documentElement
        .getAttribute('data-bs-theme') === 'dark';

    const textColor =
      isDark
        ? '#f8f9fa'
        : '#212529';

    const borderColor =
      isDark
        ? 'rgba(255,255,255,.08)'
        : 'rgba(0,0,0,.08)';

    this.salesChart = new Chart(
      this.salesChartRef.nativeElement,
      {

        type: 'line',

        data: {

          labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun'
          ],

          datasets: [

            {
              label: 'Faturamento',

              data: [
                1200,
                2100,
                3200,
                2800,
                4200,
                5200
              ],

              borderColor:
                '#7c3aed',

              backgroundColor:
                'rgba(124,58,237,.15)',

              fill: true,

              tension: .4,

              pointRadius: 4,

              pointHoverRadius: 6
            }
          ]
        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {

              display: false
            }
          },

          scales: {

            x: {

              ticks: {

                color: textColor
              },

              grid: {

                color: borderColor
              }
            },

            y: {

              ticks: {

                color: textColor
              },

              grid: {

                color: borderColor
              }
            }
          }
        }
      }
    );
  }
}
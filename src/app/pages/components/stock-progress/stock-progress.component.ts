import { CommonModule } from '@angular/common';
import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-stock-progress',

  standalone: true,
  imports:[CommonModule],

  templateUrl:
    './stock-progress.component.html',

  styleUrl:
    './stock-progress.component.scss'
})
export class StockProgressComponent {

  @Input()
  value = 0;

  @Input()
  showLabel = true;

  @Input()
  height = 10;

  get status(): string {

    if (this.value >= 70) {
      return 'success';
    }

    if (this.value >= 35) {
      return 'warning';
    }

    return 'danger';
  }

  get progressWidth(): string {

    return `${this.value}%`;
  }
}
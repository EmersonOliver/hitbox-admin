import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductDashboardResponse } from '../../models/product-dashboard.model';

@Component({
  selector: 'app-product-modal-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-modal-viewer.component.html',
  styleUrl: './product-modal-viewer.component.scss'
})
export class ProductModalViewerComponent {

  @Input()
  dashboard?: ProductDashboardResponse;

}

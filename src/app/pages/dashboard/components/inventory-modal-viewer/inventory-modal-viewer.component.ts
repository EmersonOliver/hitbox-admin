import { Component, Input } from '@angular/core';
import { InventoryDashboardResponse } from '../../models/inventory-dashboard.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-modal-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-modal-viewer.component.html',
  styleUrl: './inventory-modal-viewer.component.scss'
})
export class InventoryModalViewerComponent {

 @Input()
  dashboard?: InventoryDashboardResponse;

}

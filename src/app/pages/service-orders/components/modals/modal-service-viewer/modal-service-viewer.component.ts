import {
  Component,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';
import { ServiceOrderResponse } from '../../../models/response/service-order-response.model';


@Component({
  selector: 'app-modal-service-viewer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-service-viewer.component.html',
  styleUrls: ['./modal-service-viewer.component.scss']
})
export class ModalServiceViewerComponent {

  @Input()
  order?: ServiceOrderResponse;
}
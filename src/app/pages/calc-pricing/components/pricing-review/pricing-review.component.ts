import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pricing-review.component.html',
  styleUrl: './pricing-review.component.scss'
})
export class PricingReviewComponent {


  @Input()
  payload: any;

  @Output()
  savePayload = new EventEmitter();

  submitPayloadEvent() {
    this.savePayload.emit(this.payload);
  }

  @Output()
  backStep = new EventEmitter();

  back(step: number) {
    this.backStep.emit({ ...this.payload, nextStep: step })
    console.log({ ...this.payload, nextStep: step })
  }
}

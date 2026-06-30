import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing-fees',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pricing-fees.component.html',
  styleUrl: './pricing-fees.component.scss'
})
export class PricingFeesComponent {

  form: FormGroup;

  @Output()
  nextStep = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      marketplaceFee: [null, Validators.required],
      cardFee: [null, Validators.required],
      taxFee: [null, Validators.required],
      nextStep: [3],
      pixFee: [null, Validators.required],
      gatewayFee: [null, Validators.required],
      otherFee: [null, Validators.required],
    })
  }

  next(step: number) {
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      nextStep: step
    })
    this.nextStep.emit(this.form.getRawValue());
  }



}

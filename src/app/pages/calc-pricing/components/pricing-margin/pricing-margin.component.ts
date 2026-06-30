import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing-margin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pricing-margin.component.html',
  styleUrl: './pricing-margin.component.scss'
})
export class PricingMarginComponent {


  form: FormGroup;

  @Output()
  nextStep = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      profitMargin: [null, Validators.required],
      safetyMargin: [null, Validators.required],
      commercialCommission: [null, Validators.required],
      minimumMarkup: [null, Validators.required],
      lossReserve: [null, Validators.required],
      nextStep: [2]
    })

  }

  next(step: number) {
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      nextStep: step
    });
    this.nextStep.emit(this.form.getRawValue())
  }

}

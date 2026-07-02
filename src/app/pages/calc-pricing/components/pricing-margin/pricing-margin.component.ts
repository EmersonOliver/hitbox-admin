import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing-margin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pricing-margin.component.html',
  styleUrl: './pricing-margin.component.scss'
})
export class PricingMarginComponent implements OnChanges {


  form: FormGroup;

  @Input()
  payload: any;

  @Output()
  nextStep = new EventEmitter();

  @Output()
  backStep = new EventEmitter();

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


  ngOnChanges(changes: SimpleChanges): void {
    this.form.patchValue({
       profitMargin: this.payload.profitMargin,
      safetyMargin: this.payload.safetyMargin,
      commercialCommission: this.payload.commercialCommission,
      minimumMarkup: this.payload.minimumMarkup,
      lossReserve: this.payload.lossReserve,
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

  back(step: number) {
    this.form.patchValue({
      nextStep: step
    });
    this.backStep.emit(this.form.getRawValue())
  }

}

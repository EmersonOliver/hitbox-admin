import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing-fees',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pricing-fees.component.html',
  styleUrl: './pricing-fees.component.scss'
})
export class PricingFeesComponent implements OnChanges {

  form: FormGroup;


  @Input()
  payload: any;

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
      otherFee: [null, Validators.required]
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.form.patchValue({
      marketplaceFee: this.payload.marketplaceFee,
      cardFee: this.payload.cardFee,
      taxFee: this.payload.taxFee,
      nextStep: [3],
      pixFee: this.payload.pixFee,
      gatewayFee: this.payload.gatewayFee,
      otherFee: this.payload.otherFee,
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

  @Output()
  backStep = new EventEmitter();

  back(step: number) {
    this.form.patchValue({
      nextStep: step
    });
    this.backStep.emit(this.form.getRawValue())
  }

}

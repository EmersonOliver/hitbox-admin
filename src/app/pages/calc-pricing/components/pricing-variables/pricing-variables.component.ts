import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing-variables',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pricing-variables.component.html',
  styleUrl: './pricing-variables.component.scss'
})
export class PricingVariablesComponent {

  form: FormGroup;

  @Output()
  nextStep = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nextStep: [4],
      variables: this.fb.array([this.createVariable()])
    });

  }

  createVariable(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      unit: [null, Validators.required],
      required: [true],
      impactValue: [null, Validators.required],
      impactType: [null, Validators.required]
    })
  }

  get variables(): FormArray {
    return this.form.get('variables') as FormArray
  }

  addVariable() {
    this.variables.push(this.createVariable());
  }
  removeVariable(index: number) {
    this.variables.removeAt(index)
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

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing-variables',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pricing-variables.component.html',
  styleUrl: './pricing-variables.component.scss'
})
export class PricingVariablesComponent implements OnChanges {

  form: FormGroup;

  @Input()
  payload: any;

  @Output()
  nextStep = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nextStep: [4],
      variables: this.fb.array([this.createVariable()])
    });

  }
  ngOnChanges(changes: SimpleChanges): void {

    const payload = this.payload?.variables;
    if (!payload?.length) {
      return;
    }

    this.variables.clear();

    payload.forEach((variable: any) => {

      const formVariable = this.createVariable();

      formVariable.patchValue({
        name: variable.name,
        type: variable.type,
        unit: variable.unit,
        required: variable.required,
        impactValue: variable.impactValue,
        impactType: variable.impactType
      });

      this.variables.push(formVariable);
    });

  }

  createVariable(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      unit: [null, Validators.required],
      required: [true],
      impactValue: [null],
      impactType: [null, Validators.required]
    });
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

  @Output()
  backStep = new EventEmitter();

  back(step: number) {
    this.form.patchValue({
      nextStep: step
    });
    this.backStep.emit(this.form.getRawValue())
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-operational-cost',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './operational-cost.component.html',
  styleUrl: './operational-cost.component.scss'
})
export class OperationalCostComponent implements OnChanges {



  form: FormGroup;

  @Input()
  payload: any;

  @Output()
  nextStep = new EventEmitter();

  @Output()
  backStep = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      energyCostPerHour: [null, Validators.required],
      machineHourCost: [null, Validators.required],
      laborHourCost: [null, Validators.required],
      maintenanceRate: [null, Validators.required],
      indirectCost: [null, Validators.required],
      administrativeCost: [null, Validators.required],
      nextStep: [1]
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
   this.form.patchValue({
     energyCostPerHour: this.payload.energyCostPerHour,
      machineHourCost: this.payload.machineHourCost,
      laborHourCost: this.payload.laborHourCost,
      maintenanceRate: this.payload.maintenanceRate,
      indirectCost: this.payload.indirectCost,
      administrativeCost: this.payload.administrativeCost,
      nextStep: [1]
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

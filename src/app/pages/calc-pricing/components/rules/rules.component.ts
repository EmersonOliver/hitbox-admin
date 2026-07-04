import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input()
  payload: any;

  @Output()
  nextStep = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      active: [true],
      minimumPrice: [null, Validators.required],
      description: [null],
      nextStep: [0]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.payload) {
      this.form.patchValue({
        name: this.payload.name,
        active: this.payload.active,
        minimumPrice: this.payload.minimumPrice,
        description: this.payload.description,
        nextStep: [0]
      })
    }
  }

  ngOnInit(): void {
    
  }

  next(step: number) {
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      nextStep: step
    })
    this.nextStep.emit(this.form.getRawValue())
  }


}

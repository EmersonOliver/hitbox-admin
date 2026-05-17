import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-modal',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './inventory-modal.component.html',

  styleUrl:
    './inventory-modal.component.scss'
})
export class InventoryModalComponent {

  @Output()
  save = new EventEmitter();

  loading = false;

  imagePreview:
    string | ArrayBuffer | null = null;

  form = this.fb.group({

    name: [
      '',
      Validators.required
    ],

    category: [
      '',
      Validators.required
    ],

    quantity: [
      0,
      Validators.required
    ],

    unit: [
      'g',
      Validators.required
    ],

    minimumStock: [
      0,
      Validators.required
    ],

    cost: [
      0,
      Validators.required
    ],

    supplier: [''],

    location: [''],

    active: [true]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  onImageChange(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview =
        reader.result;
    };

    reader.readAsDataURL(file);
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    setTimeout(() => {

      this.save.emit(
        this.form.getRawValue()
      );

      this.loading = false;

    }, 1000);
  }
}
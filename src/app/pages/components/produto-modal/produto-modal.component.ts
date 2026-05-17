import {
  Component
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './produto-modal.component.html',

  styleUrl:
    './produto-modal.component.scss'
})
export class ProdutoModalComponent {

  activeTab =
    'general';

  loading = false;
  form!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({

      /* =====================================================
         GENERAL
      ===================================================== */

      name: [
        '',
        Validators.required
      ],

      sku: [
        '',
        Validators.required
      ],

      category: [''],

      description: [''],

      active: [true],

      image: [null],

      /* =====================================================
         PRICING
      ===================================================== */

      salePrice: [
        0,
        Validators.required
      ],

      profitMargin: [0],

      additionalCost: [0],

      /* =====================================================
         PRODUCTION
      ===================================================== */

      productionTime: [0],

      productionType: ['3d-print'],

      printerProfile: [''],

      /* =====================================================
         COMPOSITION
      ===================================================== */

      composition:
        this.fb.array([])
    });
  }

  /* =====================================================
     GETTERS
  ===================================================== */

  get composition(): FormArray {

    return this.form.get(
      'composition'
    ) as FormArray;
  }

  /* =====================================================
     COMPOSITION
  ===================================================== */

  addCompositionItem(): void {

    this.composition.push(

      this.fb.group({

        inventoryItemId: [
          null,
          Validators.required
        ],

        inventoryItemName: [''],

        quantity: [
          0,
          Validators.required
        ],

        unit: ['g'],

        cost: [0]
      })
    );
  }

  removeCompositionItem(
    index: number
  ): void {

    this.composition.removeAt(index);
  }

  /* =====================================================
     COST
  ===================================================== */

  get totalCompositionCost(): number {

    return this.composition.controls
      .reduce((total, item) => {

        const value =
          item.value;

        return total +
          (
            (value.quantity || 0) *
            (value.cost || 0)
          );

      }, 0);
  }

  get finalCost(): number {

    return (
      this.totalCompositionCost +
      (
        this.form.value.additionalCost || 0
      )
    );
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    console.log(
      this.form.getRawValue()
    );
  }
  onImageChange(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
}
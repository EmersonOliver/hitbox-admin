import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { InventoryModel } from '../inventory-modal/models/inventory.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageUtil } from '../../../../core/utils/image.util';
import { InventarioService } from '../../../../core/inventario/inventario.service';
import { ToastService } from '../../../components/toast/toast.service';
import { ToastComponent } from "../../../components/toast/toast.component";

declare var bootstrap: any;
@Component({
  selector: 'app-stock-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './stock-modal.component.html',
  styleUrl: './stock-modal.component.scss'
})
export class StockModalComponent implements OnChanges {


  @Output()
  save = new EventEmitter();


  @Input()
  inventorySelected?:
    InventoryModel | null = null;
  loading = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventarioService,
    private toast: ToastService
  ) {

    this.form =
      this.fb.group({

        type: [
          'ENTRY',
          Validators.required
        ],

        quantity: [
          null,
          Validators.required
        ],

        totalCost: [
          null
        ],

        observation: [
          null
        ]
      });

    this.form.valueChanges.subscribe(() => {

      this.calculatePreview();
    });
  }

  previewQuantity = 0;

  previewUnitCost = 0;

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (changes['inventory']) {

      this.calculatePreview();
    }
  }

  calculatePreview(): void {

    if (!this.inventorySelected) {
      return;
    }

    const type =
      this.form.value.type;

    const quantity =
      Number(this.form.value.quantity || 0);

    const totalCost =
      Number(this.form.value.totalCost || 0);

    const currentQuantity =
      Number(this.inventorySelected.quantity || 0);

    const currentCost =
      Number(this.inventorySelected.cost || 0);

    let newQuantity =
      currentQuantity;

    let newCost =
      currentCost;

    switch (type) {

      case 'ENTRY':

        newQuantity += quantity;

        newCost += totalCost;

        break;

      case 'OUTPUT':

      case 'LOSS':

      case 'PRODUCTION_CONSUMPTION':

        newQuantity -= quantity;

        newCost -= (
          quantity *
          this.inventorySelected.unitCost
        );

        break;

      case 'ADJUSTMENT':

        newQuantity = quantity;

        newCost = totalCost;

        break;
    }

    this.previewQuantity =
      Number(
        newQuantity.toFixed(4)
      );

    this.previewUnitCost =
      newQuantity > 0
        ? Number(
          (
            newCost /
            newQuantity
          ).toFixed(4)
        )
        : 0;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.getRawValue();
    this.inventoryService.movementStock(payload, this.inventorySelected?.id).subscribe({
      next: res => {
        this.save.emit();
        this.fecharModal();
        this.toast.show('Movimentação Registrada com Sucesso!', 'success');
        this.loading = false;
      },
      error: (error) => {
        this.toast.show('Ocorreu um erro! ' + error.error.message, 'danger');
        this.loading = false;
      }
    })
  }

  fecharModal() {
    const modalElement =
      document.getElementById(
        'stockMovementModal'
      );

    if (!modalElement) {
      return;
    }

    const modal =
      bootstrap.Modal.getInstance(
        modalElement
      );

    modal?.hide();

    this.inventorySelected = null;
    this.form.reset({
      active: true
    });
  }

  resolveImage(
    image?: string
  ): string {
    console.log(this.inventorySelected)
    if (!image) {
      return 'assets/no-image.png';
    }

    return ImageUtil.resolve(image);
  }

}

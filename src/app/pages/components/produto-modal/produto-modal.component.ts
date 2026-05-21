import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ProductResponse } from './models/produto.model';
import { InventarioService } from '../../../core/inventario/inventario.service';
import { InventoryModel } from '../inventory-modal/models/inventory.model';
import { PricingRuleService } from '../../../core/pricing/services/pricing-rule.service';
import { CategoriaModel } from '../../categorias/model/categoria.model';
import { CategoriaService } from '../../../core/categoria/categoria.service';
import { ToastService } from '../toast/toast.service';
import { SuggestedPriceResult } from '../../calc-pricing/models/suggested.pricing.model';

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
export class ProdutoModalComponent implements OnInit, AfterViewInit {


  @Output()
  save = new EventEmitter();

  @Input()
  produtoSelecionado!: ProductResponse;

  suggestedPrices:
    SuggestedPriceResult[] = [];

  activeTab =
    'general';

  loading = false;
  form!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  @ViewChild('pasteArea')
  pasteArea!: ElementRef<HTMLDivElement>;

  selectedFile!: File;

  inventoryDataResponse: InventoryModel[] = []
  categorias: CategoriaModel[] = []

  constructor(
    private fb: FormBuilder,
    private pricingService: PricingRuleService,
    private inventoryService: InventarioService,
    private categoriaService: CategoriaService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      categoriaId: [null],
      description: [''],
      active: [true],
      image: [null],
      salePrice: [0, Validators.required],
      profitMargin: [0],
      additionalCost: [0],
      productionTime: [0],
      productionType: ['3d-print'],
      printerProfile: [''],
      price: [0],
      composition: this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.loadAllInventory();
    this.loadCategorias();
  }

  ngAfterViewInit(): void {

    const modal =
      document.getElementById('productModal');

    modal?.addEventListener(
      'shown.bs.modal',
      () => {

        setTimeout(() => {

          this.pasteArea
            ?.nativeElement
            ?.focus();

        }, 100);

      }
    );
  }
  applySuggestedPrice(
    suggestion: SuggestedPriceResult
  ): void {

    this.form.patchValue({

      price:
        suggestion.suggestedPrice
    });
  }


  loadCategorias() {

    this.categoriaService.loadCategoriasByParametro('VENDA').subscribe({
      next: res => {
        this.categorias = res
      }, error: (error) => {
        this.toast.show('Ocorreu um erro ' + error.error.message, 'danger');
      }
    })

  }

  loadSuggestedPrices(): void {

    this.pricingService
      .getSuggestedPrices(
        this.totalCompositionCost
      )
      .subscribe({

        next: response => {

          this.suggestedPrices =
            response;
        }
      });
  }

  /* =====================================================
     GETTERS
  ===================================================== */

  loadAllInventory() {

    this.inventoryService.listInventoryByCategory('INSUMO').subscribe({
      next: data => {
        this.inventoryDataResponse = data;
      }
    })
  }

  get composition(): FormArray {

    return this.form.get(
      'composition'
    ) as FormArray;
  }

  selecionarRecurso(index: number): void {

    const compositionGroup =
      this.composition.at(index);

    const inventoryItemId =
      compositionGroup.get('inventoryItemId')?.value;

    const inventory =
      this.inventoryDataResponse.find(
        d => d.id == inventoryItemId
      );

    if (!inventory) {
      return;
    }

    /*
     * custo unitário
     * ex:
     * estoque total = 1000g
     * custo total = 50 reais
     * custo por g = 0.05
     */

    const unitCost =
      inventory.cost / inventory.quantity;

    compositionGroup.patchValue({

      cost: unitCost,

      unit: inventory.unit

    });

    console.log(compositionGroup.value);
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

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  /* =====================================================
     COST
  ===================================================== */

  get totalCompositionCost(): number {
    console.log('total custocomposition aqui')
    return this.composition.controls
      .reduce((total, item) => {

        const value =
          item.value;
        console.log(value);
        console.log('Valor aqui ' + value)
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
  
  async onImageChange(
    event: Event
  ): Promise<void> {

    const input =
      event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file =
      input.files[0];

    const optimized =
      await this.compressImage(file);

    this.selectedFile =
      optimized;

    this.imagePreview =
      URL.createObjectURL(optimized);
  }

  async onPaste(
    event: ClipboardEvent
  ): Promise<void> {

    event.preventDefault();

    const items =
      event.clipboardData?.items;

    if (!items) {
      return;
    }

    for (const item of Array.from(items)) {

      if (!item.type.startsWith('image/')) {
        continue;
      }

      const file =
        item.getAsFile();

      if (!file) {
        return;
      }

      const optimized =
        await this.compressImage(file);

      this.selectedFile =
        optimized;

      this.imagePreview =
        URL.createObjectURL(optimized);

      break;
    }
  }
  compressImage(
    file: File
  ): Promise<File> {

    return new Promise(resolve => {

      const image =
        new Image();

      image.src =
        URL.createObjectURL(file);

      image.onload = () => {

        const canvas =
          document.createElement('canvas');

        /*
         * REDUZ RESOLUÇÃO
         */

        const MAX_WIDTH = 1200;

        const scale =
          MAX_WIDTH / image.width;

        canvas.width =
          MAX_WIDTH;

        canvas.height =
          image.height * scale;

        const ctx =
          canvas.getContext('2d');

        ctx?.drawImage(
          image,
          0,
          0,
          canvas.width,
          canvas.height
        );

        canvas.toBlob(blob => {

          if (!blob) {
            resolve(file);
            return;
          }

          resolve(
            new File(
              [blob],
              file.name,
              {
                type: 'image/jpeg'
              }
            )
          );

        },
          'image/jpeg',
          0.7); // qualidade
      };
    });
  }
}
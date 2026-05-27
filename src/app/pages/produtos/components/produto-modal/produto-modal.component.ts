import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
import { InventarioService } from '../../../../core/inventario/inventario.service';
import { PricingRuleService } from '../../../../core/pricing/services/pricing-rule.service';
import { CategoriaModel } from '../../../categorias/model/categoria.model';
import { CategoriaService } from '../../../../core/categoria/categoria.service';
import { ToastService } from '../../../components/toast/toast.service';
import { SuggestedPriceResult } from '../../../calc-pricing/models/suggested.pricing.model';
import { InventoryModel } from '../../../inventory/components/inventory-modal/models/inventory.model';
import { ProductService } from '../../../../core/product/product.service';
import { ImageUtil } from '../../../../core/utils/image.util';
declare var bootstrap: any;

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
export class ProdutoModalComponent implements OnInit, AfterViewInit, OnChanges {


  @Output()
  save = new EventEmitter();

  @Input()
  produtoSelecionado?: ProductResponse |
    null = null


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
  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private pricingService: PricingRuleService,
    private inventoryService: InventarioService,
    private categoriaService: CategoriaService,
    private productService: ProductService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      categoryId: [null, Validators.required],
      productionWeight: [0],
      shippingWeight: [0],
      width: [0],
      height: [0],
      depth: [0],
      materials: this.fb.array([]),
      estimatedMinutes: [
        null, [Validators.pattern(
          /^(\d+d)?(\d+h)?(\d+m)?(\d+s)?$/
        )]
      ]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['produtoSelecionado']?.currentValue) {
      this.preencherFormulario();
    } else {
      this.form.reset();
      this.imagePreview = null
    }
  }
  preencherFormulario() {
    this.form.reset();
    this.materials.clear();

    this.form.patchValue({
      productId: this.produtoSelecionado?.productId,
      name: this.produtoSelecionado?.name,
      description: this.produtoSelecionado?.description,
      categoryId: this.produtoSelecionado?.categoriaId,
      productionWeight: this.produtoSelecionado?.productionWeight,
      shippingWeight: this.produtoSelecionado?.shippingWeight,
      width: 0,
      height: 0,
      depth: 0,
      estimatedMinutes: this.formatHoursToDuration(this.produtoSelecionado!.estimatedMinutes)
    });
    if (this.produtoSelecionado?.materials?.length) {
      this.produtoSelecionado?.materials.forEach(item => {
        this.materials.push(

          this.fb.group({
            inventoryId: [
              item.inventoryId,
              Validators.required
            ],

            quantity: [
              item.quantity,
              Validators.required
            ],

            consumptionType: [
              item.consumptionType
            ],

            unitCostSnapshot: [
              item.unitCostSnapshot
            ]
          })
        )
      });
      this.imagePreview =
        ImageUtil.resolve(this.produtoSelecionado.imageUrl);
    }
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

  get materials(): FormArray {

    return this.form.get(
      'materials'
    ) as FormArray;
  }

  selecionarRecurso(index: number): void {

    const materialGroup =
      this.materials.at(index);

    const inventoryId =
      materialGroup.get('inventoryId')?.value;

    const inventory =
      this.inventoryDataResponse.find(
        d => d.id == inventoryId
      );

    if (!inventory) {
      return;
    }

    const unitCost =
      inventory.unitCost;

    materialGroup.patchValue({
      unitCostSnapshot: unitCost
    });
  }

  /* =====================================================
     COMPOSITION
  ===================================================== */

  addCompositionItem(): void {

    this.materials.push(

      this.fb.group({

        inventoryId: [
          null,
          Validators.required
        ],

        quantity: [
          0,
          Validators.required
        ],

        consumptionType: [
          'FIXED'
        ],

        unitCostSnapshot: [
          0
        ]
      })
    );
  }

  removeCompositionItem(
    index: number
  ): void {

    this.materials.removeAt(index);
  }

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  /* =====================================================
     COST
  ===================================================== */

  get totalCompositionCost(): number {
    return this.materials.controls
      .reduce((total, item) => {

        const value = item.value;
        return total +
          (
            (value.quantity || 0) *
            ((value.unitCostSnapshot || 0))
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
  createPayloadAsString(formValue: any): string {
    const payload = {
      name:
        formValue.name,
      description:
        formValue.description,
      categoryId:
        formValue.categoryId,
      productionWeight:
        formValue.productionWeight,
      shippingWeight:
        formValue.shippingWeight,
      width:
        formValue.width,
      height:
        formValue.height,
      depth:
        formValue.depth,
      materials:
        formValue.materials,
      estimatedMinutes:
        this.parseDurationToHours(
          formValue.estimatedMinutes
        )
    };
    return JSON.stringify(payload);
  }
  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const multipart =
      new FormData();

    multipart.append(
      'data',
      new Blob(
        [
          this.createPayloadAsString(this.form.getRawValue())
        ],
        {
          type: 'application/json'
        }
      )
    );

    if (this.selectedFile) {

      multipart.append(
        'image',
        this.selectedFile
      );
    }

    this.buildFormData().then(formData => {
      const request = this.produtoSelecionado?.productId ?
        this.productService.edit(formData, this.produtoSelecionado.productId) :
        this.productService.save(formData);

      request.subscribe({
        next: response => {
          this.toast.show('Cadastrado com sucesso!', 'success');
          console.log(response)
          this.loading = false
          this.save.emit();
          this.fecharModal();
        },
        error: (error) => {
          console.log(error)
          this.toast.show('Erro ao cadastrar! ' + error.error.message, 'danger');
          this.loading = false

        }
      })
    });
  }


  private parseDurationToHours(value: string | null): number {

    if (!value) {
      return 0;
    }

    const normalized =
      value.toLowerCase().trim();

    const days =
      this.extract(normalized, /(\d+)d/);

    const hours =
      this.extract(normalized, /(\d+)h/);

    const minutes =
      this.extract(normalized, /(\d+)m/);

    const seconds =
      this.extract(normalized, /(\d+)s/);

    return (
      (days * 24)
      + hours
      + (minutes / 60)
      + (seconds / 3600)
    );
  }

  private extract(
    value: string,
    regex: RegExp
  ): number {

    const match =
      value.match(regex);

    return match
      ? Number(match[1])
      : 0;
  }

  private formatHoursToDuration(
    value: number | null
  ): string {

    if (!value || value <= 0) {
      return '';
    }

    let totalSeconds =
      Math.round(value * 3600);

    const days =
      Math.floor(totalSeconds / 86400);

    totalSeconds %= 86400;

    const hours =
      Math.floor(totalSeconds / 3600);

    totalSeconds %= 3600;

    const minutes =
      Math.floor(totalSeconds / 60);

    const seconds =
      totalSeconds % 60;

    const parts: string[] = [];

    if (days > 0) {
      parts.push(`${days}d`);
    }

    if (hours > 0) {
      parts.push(`${hours}h`);
    }

    if (minutes > 0) {
      parts.push(`${minutes}m`);
    }

    if (seconds > 0) {
      parts.push(`${seconds}s`);
    }

    return parts.join('');
  }
  private async urlToFile(
    url: string,
    fileName: string
  ): Promise<File> {

    const response =
      await fetch(url);

    const blob =
      await response.blob();

    return new File(
      [blob],
      fileName,
      {
        type: blob.type
      }
    );
  }
  private async buildFormData():
    Promise<FormData> {

    const formData =
      new FormData();

    formData.append(
      'data',
      new Blob(
        [
          this.createPayloadAsString(this.form.getRawValue())
        ],
        {
          type:
            'application/json'
        }
      )
    );

    /* ==========================
       NOVA IMAGEM
    ========================== */
    if (this.selectedFile) {
      formData.append(
        'image',
        this.selectedFile
      );

      return formData;
    }


    /* ==========================
       IMAGEM EXISTENTE
    ========================== */

    if (
      this.produtoSelecionado?.productId &&
      this.imagePreview &&
      typeof this.imagePreview === 'string'
    ) {

      const file =
        await this.urlToFile(

          this.imagePreview,

          'inventory.webp'
        );

      formData.append(
        'image',
        file
      );
    }

    return formData;
  }

  fecharModal() {
    const modalElement =
      document.getElementById(
        'productModal'
      );

    if (!modalElement) {
      return;
    }

    const modal =
      bootstrap.Modal.getInstance(
        modalElement
      );

    modal?.hide();

    this.imagePreview = null;
    this.selectedFile = undefined!;
    this.editar = false;
    this.produtoSelecionado = undefined;
    this.form.reset({
      active: true
    });
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
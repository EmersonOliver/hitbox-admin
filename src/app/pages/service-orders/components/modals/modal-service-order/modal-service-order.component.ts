import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { FormArray, FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServiceOrderRequest } from '../../../models/request/service-order-request.model';
import { ServiceOrderItemProductRequest } from '../../../models/request/service-order-item-product-request.model';
import { ClienteService } from '../../../../../core/cliente/cliente.service';
import { ProductResponse } from '../../../../produtos/components/produto-modal/models/produto.model';
import { ClienteResponse } from '../../../../clientes/models/cliente.response';
import { ProductService } from '../../../../../core/product/product.service';
import { PricingRuleService } from '../../../../../core/pricing/services/pricing-rule.service';
import { PricingRuleResponse } from '../../../../calc-pricing/models/pricing.rules.response';
import { SuggestedPriceResult } from '../../../../calc-pricing/models/suggested.pricing.model';
import { InventarioService } from '../../../../../core/inventario/inventario.service';
import { Router, RouterLink } from "@angular/router";


declare var bootstrap: any;

@Component({
  selector: 'app-modal-service-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-service-order.component.html',
  styleUrls: ['./modal-service-order.component.scss']
})
export class ModalServiceOrderComponent
  implements OnInit, OnChanges {

  @Input()
  order?: ServiceOrderRequest;

  @Input()
  clientes: ClienteResponse[] = [];

  @Input()
  produtos: ProductResponse[] = [];

  rules: PricingRuleResponse[] = [];
  suggestedPriceResult?: SuggestedPriceResult;
  ruleSelected?: PricingRuleResponse;
  productIndex = -1;
  error: boolean = false

  @Output()
  save =
    new EventEmitter<ServiceOrderRequest>();

  model: ServiceOrderRequest = this.createEmptyOrder();
  form: FormGroup;
  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    private inventarioService: InventarioService,
    private productService: ProductService,
    private ruleService: PricingRuleService
  ) {
    this.form = fb.group({
      clienteId: [''],
      observations: [''],
      ruleId: [null],
      items: fb.array([]),
      totalProfit: [0],
      totalSalePrice: [0],
      totalEstimatedMinutes: [0]
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarProdutos();
    this.carregarRulesPrice();
  }

  stockMessageError: any[] = []

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  carregarRulesPrice() {
    this.ruleService.findAll().subscribe({
      next: response => {
        this.rules = response;
      },
      error: (error) => {

      }
    })
  }

  carregarClientes() {
    this.clienteService.findAll().subscribe({
      next: response => {
        this.clientes = response;
      }, error: (error) => {

      }
    })
  }

  carregarProdutos() {
    this.productService.findAll().subscribe({
      next: response => {
        this.produtos = response;
      },
      error: (error) => {
        console.log(error)
      }
    }
    )
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (changes['order']) {

      this.model =
        this.order
          ? structuredClone(this.order)
          : this.createEmptyOrder();
    }
  }

  createEmptyOrder(): ServiceOrderRequest {
    return {
      clienteId: '',
      observations: '',
      items: [],
      totalProfit: 0,
      totalSalePrice: 0,
      totalEstimatedMinutes: 0
    };
  }

  addItem(): void {
    this.items.push(
      this.fb.group({
        productId: [null, Validators.required],
        quantity: [1, Validators.required],
        costUnit: [null, Validators.required],
        totalItemCost: [null, Validators.required],
        salePriceUnit: [null, Validators.required],
        totalSalePrice: [null, Validators.required],
        estimatedMinutes: [null, [Validators.pattern(
          /^(\d+d)?(\d+h)?(\d+m)?(\d+s)?$/
        )]]
      })
    );
    // this.calculateTotals();
  }

  removeItem(index: number): void {

    this.items.removeAt(index);

    this.calculateTotals();

  }
  onProductChange(index: number): void {

    this.error = false;
    this.productIndex = index;

    if (index < 0) {
      return;
    }

    const itemGroup =
      this.items.at(index);

    const productId =
      itemGroup.get('productId')?.value;

    const quantity =
      Number(
        itemGroup.get('quantity')?.value || 1
      );

    const product =
      this.produtos.find(
        p => p.productId == productId
      );

    if (!product) {
      return;
    }

    /*
     * ===========================
     * VALIDAÇÃO DE ESTOQUE
     * ===========================
     */

    const stockMap =
      new Map<number, number>();

    this.items.controls.forEach(control => {

      const currentProductId =
        control.get('productId')?.value;

      const currentQuantity =
        Number(
          control.get('quantity')?.value || 0
        );

      if (
        !currentProductId ||
        currentQuantity <= 0
      ) {
        return;
      }

      const currentProduct =
        this.produtos.find(
          p => p.productId == currentProductId
        );

      if (!currentProduct) {
        return;
      }

      currentProduct.materials.forEach(mat => {

        const required =
          mat.quantity * currentQuantity;

        const current =
          stockMap.get(mat.inventoryId) || 0;

        stockMap.set(
          mat.inventoryId,
          current + required
        );

      });

    });

    const payload =
      Array.from(stockMap.entries())
        .map(([inventoryId, quantity]) => ({
          inventoryId,
          quantity
        }));

    console.log(payload);

    this.inventarioService
      .stockAvailable(payload)
      .subscribe({
        next: () => {
          this.error = false;
          this.stockMessageError = [];
        },

        error: (error) => {
          this.error = true;
          this.stockMessageError =
            Array.isArray(error.error)
              ? error.error
              : [error.error];

          const errorModal =
            new bootstrap.Modal(
              document.getElementById(
                'inventoryModalStockError'
              ),
              {
                backdrop: 'static',
                keyboard: false
              }
            );

          errorModal.show();

        }

      });

    /*
     * ===========================
     * CÁLCULO DE PREÇO
     * ===========================
     */

    const ruleId =
      product.pricingRuleId;

    this.ruleSelected =
      this.rules.find(
        r => r.id == ruleId
      );

    if (!ruleId) {
      return;
    }

    const filamentWeight =
      product.materials?.reduce(
        (acc, material) =>
          acc + Number(material.quantity || 0),
        0
      ) || 0;

    const payloadPrice = {

      productionCost:
        Number(
          product.currentCalculatedCost || 0
        ),

      filamentWeight,

      filamentCostPerGram: 0,

      printHours:
        Number(
          product.estimatedMinutes * quantity || 0
        ),

      machineHourCost: 0,

      energyCost: 0,

      packagingCost: 0,

      maintenancePercentage: 0

    };

    this.ruleService
      .ruleById(
        payloadPrice,
        ruleId
      )
      .subscribe({

        next: response => {

          this.suggestedPriceResult =
            response;

          const costUnit =
            Number(
              response.unitCost || 0
            );

          const salePriceUnit =
            Number(
              response.unitPrice ||
              response.suggestedPrice ||
              0
            );

          const totalItemCost =
            quantity * costUnit;

          const totalSalePrice =
            quantity * salePriceUnit;

          itemGroup.patchValue({

            costUnit,

            salePriceUnit,

            totalItemCost,

            totalSalePrice,

            estimatedMinutes:
              this.formatHoursToDuration(
                product.estimatedMinutes * quantity || 0
              )

          });

          this.calculateTotals();

        },

        error: error => {

          console.error(
            'Erro ao calcular preço',
            error
          );

        }

      });

  }

  // onProductChange(index: number): void {
  //   this.error = false;
  //   this.productIndex = index;
  //   if (this.productIndex < 0) {
  //     return;
  //   }

  //   const itemGroup =
  //     this.items.at(index);

  //   const productId =
  //     itemGroup.get('productId')?.value;

  //   const product =
  //     this.produtos.find(
  //       p => p.productId == productId
  //     );

  //   if (!product) {
  //     return;
  //   }

  //   const quantity =
  //     Number(
  //       itemGroup.get('quantity')?.value || 1
  //     );
  //   if (quantity >= 1) {

  //     const stockMap =
  //       new Map<number, number>();

  //     product.materials.forEach(mat => {

  //       const inventoryId =
  //         mat.inventoryId;

  //       const required =
  //         mat.quantity * quantity;

  //       const current =
  //         stockMap.get(inventoryId) || 0;

  //       stockMap.set(
  //         inventoryId,
  //         current + required
  //       );

  //       const payload =
  //         Array.from(stockMap.entries())
  //           .map(([inventoryId, quantity]) => ({
  //             inventoryId,
  //             quantity
  //           }));
  //       console.log(payload)
  //       this.inventarioService.stockAvailable(mat.inventoryId, required).subscribe({
  //         next: response => {

  //         }, error: (error) => {
  //           this.error = true;
  //           this.stockMessageError.push(error.error);
  //           const errorModal =
  //             new bootstrap.Modal(
  //               document.getElementById(
  //                 'inventoryModalStockError'
  //               ),
  //               {
  //                 backdrop: 'static',
  //                 keyboard: false
  //               }
  //             );

  //           errorModal.show();
  //         }
  //       })
  //     });

  //     if (!this.error) {
  //       this.stockMessageError = []
  //     }
  //   }

  //   const ruleId =
  //     product.pricingRuleId;

  //   this.ruleSelected = this.rules.find(f => f.id == ruleId);

  //   if (!ruleId) {
  //     return;
  //   }

  //   /*
  //     peso total dos materiais
  //   */
  //   const filamentWeight =
  //     product.materials?.reduce(
  //       (acc, material) =>
  //         acc + Number(material.quantity || 0),
  //       0
  //     ) || 0;

  //   /*
  //     payload do motor de precificação
  //   */
  //   const payload = {

  //     productionCost:
  //       Number(
  //         product.currentCalculatedCost || 0
  //       ),

  //     filamentWeight,

  //     filamentCostPerGram: 0,

  //     printHours:
  //       Number(
  //         product.estimatedMinutes * quantity || 0
  //       ),

  //     machineHourCost: 0,

  //     energyCost: 0,

  //     packagingCost: 0,

  //     maintenancePercentage: 0

  //   };

  //   /*
  //     backend calcula tudo
  //   */
  //   this.ruleService
  //     .ruleById(payload, ruleId)
  //     .subscribe({

  //       next: response => {

  //         this.suggestedPriceResult = response;
  //         const costUnit =
  //           Number(
  //             response.unitCost || 0
  //           );

  //         const salePriceUnit =
  //           Number(
  //             response.unitPrice ||
  //             response.suggestedPrice ||
  //             0
  //           );
  //         const totalItemCost =
  //           quantity * costUnit;

  //         const totalSalePrice =
  //           quantity * salePriceUnit;

  //         itemGroup.patchValue({

  //           costUnit,

  //           salePriceUnit,

  //           totalItemCost,

  //           totalSalePrice,

  //           estimatedMinutes:
  //             this.formatHoursToDuration(
  //               product.estimatedMinutes * quantity || 0
  //             )

  //         });

  //         this.calculateTotals();

  //       },

  //       error: error => {

  //         console.error(
  //           'Erro ao calcular preço',
  //           error
  //         );

  //       }

  //     });

  // }

  calculateTotals(): void {

    const items =
      this.items.controls;

    let totalSalePrice = 0;

    let totalCost = 0;

    let totalEstimatedMinutes = 0;

    items.forEach(item => {

      totalSalePrice += Number(
        item.get('totalSalePrice')?.value || 0
      );

      totalCost += Number(
        item.get('totalItemCost')?.value || 0
      );

      totalEstimatedMinutes +=
        this.parseDurationToHours(
          item.get('estimatedMinutes')?.value
        );

    });

    const totalProfit =
      totalSalePrice - totalCost;

    this.form.patchValue({

      totalSalePrice,
      totalProfit,
      totalEstimatedMinutes:
        this.formatHoursToDuration(
          totalEstimatedMinutes
        )

    }, { emitEvent: false });

  }

  saveOrder(): void {

    const formValue =
      this.form.getRawValue();

    const payload: ServiceOrderRequest = {

      clienteId:
        formValue.clienteId,

      observations:
        formValue.observations,

      totalProfit:
        formValue.totalProfit,

      totalSalePrice:
        formValue.totalSalePrice,

      totalEstimatedMinutes:
        this.parseDurationToHours(
          formValue.totalEstimatedMinutes
        ),

      items:
        formValue.items.map((item: any) => ({

          productId:
            item.productId,

          quantity:
            Number(item.quantity),

          costUnit:
            Number(item.costUnit),

          totalItemCost:
            Number(item.totalItemCost),

          salePriceUnit:
            Number(item.salePriceUnit),

          totalSalePrice:
            Number(item.totalSalePrice),

          estimatedMinutes:
            this.parseDurationToHours(
              item.estimatedMinutes
            )

        }))

    };

    this.save.emit(payload);

    const modal =
      bootstrap.Modal.getInstance(
        document.getElementById(
          'serviceOrderModal'
        )
      );

    modal.hide();

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

  goToInventory(id: number): void {

    this.closeAllModals();

    this.router.navigate(
      ['/inventario', id]
    );
  }

  closeAllModals(): void {

    document
      .querySelectorAll('.modal.show')
      .forEach(modalElement => {

        bootstrap.Modal
          .getInstance(modalElement)
          ?.hide();

      });
  }
}
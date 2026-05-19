import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { InventarioService } from '../../../core/inventario/inventario.service';
import { ToastService } from '../toast/toast.service';
import { CategoriaModel } from '../../categorias/model/categoria.model';
import { CategoriaService } from '../../../core/categoria/categoria.service';
import { InventoryModel } from './models/inventory.model';
import {
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ImageUtil } from '../../../core/utils/image.util';

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
export class InventoryModalComponent implements OnInit, OnChanges {

  @Output()
  save = new EventEmitter();

  @Input()
  inventorySelected?:
    InventoryModel | null = null;

  loading = false;
  selectedFile!: File;
  categorias: CategoriaModel[] = []

  editar = false;

  imagePreview:
    string | ArrayBuffer | null = null;

  form = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    categoriaId: [null as number | null, Validators.required],
    quantity: [0, Validators.required],
    unit: ['g', Validators.required],
    minimumStock: [0, Validators.required],
    cost: [0, Validators.required],
    supplier: [''],
    location: [''],
    active: [true]
  });

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private categoriaService: CategoriaService,
    private toast: ToastService
  ) { }


  ngOnInit(): void {
    this.loadCategorias();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inventorySelected']?.currentValue) {
      this.fillForm(
        changes['inventorySelected']
          .currentValue
      );

    } else {
      this.form.reset({
        active: true
      });
      this.imagePreview = null;
    }
  }

  onImageChange(
    event: Event
  ): void {

    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    this.selectedFile = file;
    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview =
        reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  loadCategorias() {
    this.categoriaService.loadCategoriasWithouPages().subscribe({
      next: response => {
        this.categorias = response.content;
      },
      error: (msg) => {
        this.toast.show('Ocorreu um erro ' + msg.error.message, 'danger');
      }
    });
  }
  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData =
      new FormData();

    formData.append(
      'data',

      new Blob(
        [
          JSON.stringify(
            this.form.getRawValue()
          )
        ],
        {
          type: 'application/json'
        }
      )
    );
    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );
    }

    this.loading = true;

    this.buildFormData().then(formData => {
      const request = this.editar ?
        this.inventarioService.edit(
          this.inventorySelected!.id!,
          formData
        ) : this.inventarioService
          .save(formData);
      request.subscribe({
        next: () => {
          this.loading = false;
          this.form.reset({
            active: true
          });
          this.imagePreview = null;
          this.selectedFile = undefined!;
          this.toast.show('Salvo com sucesso!', 'success');
          this.save.emit();
          this.editar = false;
        },
        error: (error) => {
          this.loading = false;
          this.toast.show('Ocorreu um erro ' + error.error.message, 'danger');
        }
      });
    })

    // setTimeout(() => {

    //   if (this.editar) {

    //     formData.append('idInventario',
    //       String(this.inventorySelected?.id));
    //     console.log(formData)

    //     this.inventarioService.edit(formData)
    //       .subscribe({
    //         next: (response) => {
    //           console.log(response);
    //           this.loading = false;
    //           this.form.reset({
    //             active: true
    //           });
    //           this.imagePreview = null;
    //           this.selectedFile = undefined!;
    //           this.toast.show('Editado com sucesso!', 'success');
    //           this.save.emit();
    //           this.editar = false;
    //         },
    //         error: (error) => {
    //           console.error(error);
    //           this.loading = false;
    //         }
    //       })

    //   } else {
    //     this.inventarioService
    //       .save(formData)
    //       .subscribe({
    //         next: (response) => {
    //           console.log(response);
    //           this.loading = false;
    //           this.form.reset({
    //             active: true
    //           });
    //           this.imagePreview = null;
    //           this.selectedFile = undefined!;
    //           this.toast.show('Salvo com sucesso!', 'success');
    //           this.save.emit();
    //         },
    //         error: (error) => {
    //           console.error(error);
    //           this.loading = false;
    //         }
    //       });
    //   }

    // }, 1000);
  }
  fillForm(inventory: InventoryModel): void {
    if (inventory.categoriaId)
      this.form.patchValue({
        id: inventory.id,
        name:
          inventory.name,
        categoriaId:
          inventory.categoriaId,
        quantity:
          inventory.quantity,
        unit:
          inventory.unit,
        minimumStock:
          inventory.minimumStock,
        cost:
          inventory.cost,
        supplier:
          inventory.supplier,
        location:
          inventory.location,
        active:
          inventory.active
      });

    this.imagePreview =
      ImageUtil.resolve(inventory.imageUrl);
    this.editar = true;
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
          JSON.stringify(
            this.form.getRawValue()
          )
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
      this.editar &&
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
}
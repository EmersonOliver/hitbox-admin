import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { InventoryModel } from './models/inventory.model';
import {
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CategoriaModel } from '../../../categorias/model/categoria.model';
import { InventarioService } from '../../../../core/inventario/inventario.service';
import { CategoriaService } from '../../../../core/categoria/categoria.service';
import { ToastService } from '../../../components/toast/toast.service';
import { ImageService } from '../../../../core/image/image.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var bootstrap: any;

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

  @ViewChild('pasteArea')
  pasteArea!: ElementRef<HTMLDivElement>;

  loading = false;
  selectedFile!: File;
  categorias: CategoriaModel[] = []


  imagePreview:
    string | ArrayBuffer | null = null;

  form = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    categoriaId: [null as number | null, Validators.required],
    unit: ['g', Validators.required],
    minimumStock: [0, Validators.required],
    supplier: [''],
    location: [''],
    active: [true]
  });

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private inventarioService: InventarioService,
    private categoriaService: CategoriaService,
    private toast: ToastService,
    private router: Router
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

  ngAfterViewInit(): void {

    const modal =
      document.getElementById('inventoryModal');

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

  fecharModal() {
    const modalElement =
      document.getElementById(
        'inventoryModal'
      );

    if (!modalElement) {
      return;
    }

    const modal =
      bootstrap.Modal.getInstance(
        modalElement
      );

    modal?.hide();

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


  loadCategorias() {
    this.categoriaService.loadCategoriasWithouPages().subscribe({
      next: response => {
        this.categorias = response.content;
        this.categorias = this.categorias.filter(res=> res.tipo == 'INSUMO')
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
      this.buildFormData();


    const request = this.inventorySelected?.id ?
      this.inventarioService.edit(
        this.inventorySelected?.id!,
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
        this.fecharModal();
        this.inventorySelected = null;
  
      },
      error: (error) => {
        this.loading = false;
        this.toast.show('Ocorreu um erro ' + error.error.message, 'danger');
      }
    });

  }
  fillForm(inventory: InventoryModel): void {
    if (inventory.categoriaId)
      this.form.patchValue({
        id: inventory.id,
        name:
          inventory.name,
        categoriaId:
          inventory.categoriaId,
        unit:
          inventory.unit,
        minimumStock:
          inventory.minimumStock,

        supplier:
          inventory.supplier,
        location:
          inventory.location,
        active:
          inventory.active
      });

    this.imagePreview = null;

    if (!inventory.imageUrl) {
      return;
    }

    this.imageService
      .load(inventory.imageUrl)
      .subscribe(url => {

        this.imagePreview = url;

      });
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

  private buildFormData(): FormData {

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

    return formData;
  }

  onPasteImage(event: ClipboardEvent): void {

    const items = event.clipboardData?.items;
    if (!items) {
      return;
    }

    Array.from(items).forEach(item => {

      if (
        item.type.includes('image')
      ) {

        const file =
          item.getAsFile();

        if (!file) {
          return;
        }

      }
    });
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
}
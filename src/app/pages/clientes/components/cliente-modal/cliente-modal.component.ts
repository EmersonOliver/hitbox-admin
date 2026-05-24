import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ClienteResponse } from '../../models/cliente.response';
import { ClienteModel } from '../../models/cliente.model';
import { ClienteService } from '../../../../core/cliente/cliente.service';
import { ToastService } from '../../../components/toast/toast.service';
declare var bootstrap: any;
@Component({
  selector: 'app-cliente-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cliente-modal.component.html',
  styleUrl: './cliente-modal.component.scss'
})
export class ClienteModalComponent implements OnInit, OnChanges {


  @Input()
  clienteSelecionado?: ClienteResponse | null;

  @Output()
  save =
    new EventEmitter<ClienteResponse>();

  form!: FormGroup;

  modal: any;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {

    this.initForm();

    const element =
      document.getElementById(
        'clienteModal'
      );

    if (element) {

      this.modal =
        new bootstrap.Modal(element);
    }
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['clienteSelecionado'] &&
      this.form
    ) {

      this.preencherFormulario();
    }
  }

  initForm(): void {

    this.form =
      this.fb.group({
        nome: [
          null,
          Validators.required
        ],
        documento: [''],
        email: [
          null,
          Validators.email
        ],
        telefone: [null],
        enderecos:
          this.fb.array([])
      });

    this.adicionarEndereco();
  }

  get enderecos(): FormArray {

    return this.form.get(
      'enderecos'
    ) as FormArray;
  }

  criarEndereco(): FormGroup {

    return this.fb.group({

      tipo: ['RESIDENCIAL'],

      endereco: [''],

      cep: [''],

      numero: [null],

      bairro: [''],

      cidade: [''],

      complemento: [''],

      observacoes: ['']
    });
  }

  adicionarEndereco(): void {

    this.enderecos.push(
      this.criarEndereco()
    );
  }

  removerEndereco(index: number): void {

    this.enderecos.removeAt(index);

    if (
      this.enderecos.length === 0
    ) {
      // this.adicionarEndereco();
    }
  }

  open(): void {

    this.preencherFormulario();

    this.modal.show();
  }

  preencherFormulario(): void {

    this.form.reset();
    this.enderecos.clear();

    if (!this.clienteSelecionado) {
      this.adicionarEndereco();
      return;
    }

    this.form.patchValue({

      nome:
        this.clienteSelecionado.nome,

      documento:
        this.clienteSelecionado.documento,

      email:
        this.clienteSelecionado.email,

      telefone:
        this.clienteSelecionado.telefone
    });

    if (
      this.clienteSelecionado.enderecos?.length
    ) {

      this.clienteSelecionado.enderecos
        .forEach(endereco => {
          this.enderecos.push(
            this.fb.group({
              tipo: [endereco.tipo],
              endereco: [endereco.endereco],
              cep: [endereco.cep],
              numero: [endereco.numero],
              bairro: [endereco.bairro],
              cidade: [endereco.cidade],
              complemento: [endereco.complemento],
              observacoes: [endereco.observacoes]
            })
          );
        });
      return;
    }

    this.adicionarEndereco();
  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: ClienteModel = {
      ...this.clienteSelecionado,
      ...this.form.value
    };

    const request = this.clienteSelecionado?.id ?
      this.clienteService.edit(payload, this.clienteSelecionado.id)
      : this.clienteService.save(payload);
    request.subscribe({
      next: response => {
        this.save.emit(response);
        this.toast.show('Cadastrado com sucesso!', 'success');
        this.form.reset();
        this.fecharModal();
      }, error: (error) => {
        this.toast.show('Ocorreu um erro ' + error.error.message, 'danger')
      }
    });

  }

  fecharModal() {
    const modalElement =
      document.getElementById(
        'clienteModal'
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

}

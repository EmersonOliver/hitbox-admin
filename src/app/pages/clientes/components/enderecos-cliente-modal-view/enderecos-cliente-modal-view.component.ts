import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteResponse } from '../../models/cliente.response';

declare var bootstrap: any;
@Component({
  selector: 'app-enderecos-cliente-modal-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enderecos-cliente-modal-view.component.html',
  styleUrl: './enderecos-cliente-modal-view.component.scss'
})
export class EnderecosClienteModalViewComponent implements OnChanges {
  @Input()
  clienteSelecionado?: ClienteResponse | null;
  modal: any;

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['clienteSelecionado'] &&
      this.clienteSelecionado
    ) {

    }
  }

  openModal(): void {

    const modalElement =
      document.getElementById(
        'enderecosClienteModalView'
      );

    if (!modalElement) {
      return;
    }

    this.modal =
      bootstrap.Modal.getOrCreateInstance(
        modalElement
      );

    this.modal.show();
  }

  closeModal(): void {

    if (this.modal) {
      this.modal.hide();
    }
  }

  getTipoEndereco(
    tipo?: string
  ): string {

    switch (tipo) {

      case 'RESIDENCIAL':
        return 'Residencial';

      case 'COMERCIAL':
        return 'Comercial';

      case 'ENTREGA':
        return 'Entrega';

      case 'COBRANCA':
        return 'Cobrança';

      default:
        return '-';
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducaoModalComponent } from "./components/producao-modal/producao-modal.component";
import { HistoricoModalComponent } from "./components/historico-modal/historico-modal.component";

declare var bootstrap: any;

type ProductionStatus =
  | 'PENDENTE'
  | 'CONFIGURACAO'
  | 'PRODUZINDO'
  | 'MONTAGEM'
  | 'FINALIZADO';

interface Production {
  id: number;
  produto: string;
  impressora: string;
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA';
  progresso: number;
  tempoRestante?: string;
  status: ProductionStatus;
}

@Component({
  selector: 'app-producao',
  standalone: true,
  imports: [CommonModule, ProducaoModalComponent, HistoricoModalComponent],
  templateUrl: './producao.component.html',
  styleUrl: './producao.component.scss'
})
export class ProducaoComponent {

  productions: Production[] = [

    {
      id: 1,
      produto: 'Suporte PS5',
      impressora: 'Bambu Lab X1',
      prioridade: 'ALTA',
      progresso: 0,
      status: 'PENDENTE'
    },

    {
      id: 2,
      produto: 'Case Raspberry',
      impressora: 'Ender 3',
      prioridade: 'MEDIA',
      progresso: 20,
      tempoRestante: '3h 20m',
      status: 'CONFIGURACAO'
    },

    {
      id: 3,
      produto: 'Miniatura Zelda',
      impressora: 'Bambu Lab P1P',
      prioridade: 'ALTA',
      progresso: 68,
      tempoRestante: '1h 12m',
      status: 'PRODUZINDO'
    },

    {
      id: 4,
      produto: 'Drone Frame',
      impressora: 'Ender 5',
      prioridade: 'BAIXA',
      progresso: 100,
      status: 'MONTAGEM'
    }
  ];

  getByStatus(status: ProductionStatus) {

    return this.productions
      .filter(p => p.status === status);
  }

  nextStep(production: Production): void {

    switch (production.status) {

      case 'PENDENTE':
        production.status = 'CONFIGURACAO';
        production.progresso = 10;
        break;

      case 'CONFIGURACAO':
        production.status = 'PRODUZINDO';
        production.progresso = 35;
        break;

      case 'PRODUZINDO':
        production.status = 'MONTAGEM';
        production.progresso = 90;
        break;

      case 'MONTAGEM':
        production.status = 'FINALIZADO';
        production.progresso = 100;
        break;
    }
  }

  getNextButtonLabel(status: ProductionStatus): string {

    switch (status) {

      case 'PENDENTE':
        return 'Iniciar configuração';

      case 'CONFIGURACAO':
        return 'Iniciar produção';

      case 'PRODUZINDO':
        return 'Finalizar Produção';

      case 'MONTAGEM':
        return 'Concluir produção';

      default:
        return '';
    }
  }

  getBackButtonLabel(status: ProductionStatus): string {

    switch (status) {

      case 'PENDENTE':
        return 'Iniciar configuração';

      case 'CONFIGURACAO':
        return 'Iniciar produção';

      case 'PRODUZINDO':
        return 'Finalizar produção';

      case 'MONTAGEM':
        return 'Concluir produção';

      default:
        return '';
    }
  }
   backStep(production: Production): void {

    switch (production.status) {


      case 'CONFIGURACAO':
        production.status = 'PENDENTE';
        production.progresso = 35;
        break;

      case 'PRODUZINDO':
        production.status = 'CONFIGURACAO';
        production.progresso = 90;
        break;

      case 'MONTAGEM':
        production.status = 'PRODUZINDO';
        production.progresso = 100;
        break;
    }
  }

  getPriorityClass(priority: string): string {

    switch (priority) {

      case 'ALTA':
        return 'danger';

      case 'MEDIA':
        return 'warning';

      default:
        return 'primary';
    }
  }

  openNewProductionModal(id:string): void {

    const modal = new bootstrap.Modal(
      document.getElementById(id)
    );

    modal.show();
  }
}
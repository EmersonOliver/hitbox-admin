import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-workspace-setup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workspace-setup.component.html',
  styleUrl: './workspace-setup.component.scss'
})
export class WorkspaceSetupComponent
  implements OnInit {

  currentStep = 0;

  readonly steps = [
    'Criando ambiente',
    'Configurando permissões',
    'Preparando inventário',
    'Inicializando dashboard',
    'Finalizando'
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    const interval =
      setInterval(() => {

        this.currentStep++;

        if (
          this.currentStep >=
          this.steps.length
        ) {

          clearInterval(interval);

          setTimeout(() => {

            this.router.navigate(
              ['/dashboard']
            );

          }, 800);

        }

      }, 1000);
  }
}
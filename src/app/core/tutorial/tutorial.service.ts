import { Injectable } from '@angular/core';
// import * as Shepherd from 'shepherd.js';
import Shepherd, { Tour, StepOptions } from 'shepherd.js';
import { TutorialStep } from './tutorial.types';


@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  // private tour!: Tour;

  startTour(steps: TutorialStep[]) {

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        scrollTo: true,
        cancelIcon: {
          enabled: true
        }
      }
    });

    steps.forEach((step, index) => {

      const isLast = index === steps.length - 1;

      tour.addStep({
        id: step.id,
        title: step.title,
        text: step.text,
        attachTo: step.attachTo,

        buttons: isLast
          ? [
            {
              text: 'Voltar',
              action: tour.back
            },
            {
              text: 'Concluir',
              action: () => {
                this.finishTour(step.id as string);
                tour.complete();
              }
            }
          ]
          : [
            {
              text: 'Pular',
              action: () => {
                this.finishTour(step.id as string);
                tour.cancel();
              }
            },
            {
              text: 'Próximo',
              action: tour.next
            }
          ]
      });
    });

    tour.start();


  }
    private finishTour(tourName: string): void {
      console.log(tourName)
    localStorage.setItem(
      `tour_completed_${tourName}`,
      'true'
    );
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import flatpickr from 'flatpickr';

import { Portuguese } from 'flatpickr/dist/l10n/pt';

import { Instance } from 'flatpickr/dist/types/instance';

@Component({
  selector: 'app-range-datepicker',
  standalone: true,
  templateUrl: './range-datepicker.component.html',
  styleUrl: './range-datepicker.component.scss'
})
export class RangeDatepickerComponent
  implements AfterViewInit {

  @ViewChild('dateInput')
  input!: ElementRef<HTMLInputElement>;

  private picker!: Instance;

  change() {
    var dates = this.picker.selectedDates;
    if(dates.length > 1) {
      console.log(dates)
    }
  }

  ngAfterViewInit(): void {

    this.picker = flatpickr(
      this.input.nativeElement as HTMLInputElement,
      {

        locale: {
          ...Portuguese,
          firstDayOfWeek: 1,
          rangeSeparator: ' até '
        },

        mode: 'range',

        dateFormat: 'd/m/Y',

        disableMobile: true,

        showMonths:
          window.innerWidth > 991 ? 2 : 1
      }
    );
  }
}
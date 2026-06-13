import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import flatpickr from 'flatpickr';

import { Portuguese } from 'flatpickr/dist/l10n/pt';

import { Instance } from 'flatpickr/dist/types/instance';

@Component({
  selector: 'app-range-datepicker',
  standalone: true,
  templateUrl: './range-datepicker.component.html',
  styleUrl: './range-datepicker.component.scss',
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => RangeDatepickerComponent
      ),
      multi: true
    }
  ]
})
export class RangeDatepickerComponent
  implements AfterViewInit, ControlValueAccessor {

  @ViewChild('dateInput', { static: false })
  input!: ElementRef<HTMLInputElement>;

  @Output()
  dateChange = new EventEmitter<Date[]>();
  private _value: Date[] = [];

  private picker!: Instance;

  private pendingValue?: Date[];

  private onTouchedFn: () => void = () => { };
  private onChangeFn: (value: Date[]) => void = () => { };

  ngAfterViewInit(): void {

    if (!this.input) {
      return;
    }
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
          window.innerWidth > 991 ? 2 : 1,
        onChange: (period) => {
          this._value = [...period];
          this.onChangeFn(this._value);
          this.dateChange.emit(this._value);
            this.onTouchedFn();
        }
      }
    );
    if (
      this.pendingValue?.length
    ) {
      this.picker.setDate(
        this.pendingValue,
        false
      );
    }
    this.input.nativeElement.disabled =
      this.disabled;
  }
  writeValue(value: Date[] | null): void {

    this._value = value ?? [];

    if (!this.picker) {

      this.pendingValue = this._value;

      return;
    }

    this.picker.setDate(
      this._value,
      false
    );
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  private disabled = false;

  setDisabledState(
    isDisabled: boolean
  ): void {

    this.disabled = isDisabled;

    if (this.input) {
      this.input.nativeElement.disabled =
        isDisabled;
    }
  }

  getPlaceholder(): string {

    const today =
      formatDate(
        new Date(),
        'dd/MM/yyyy',
        'pt-BR'
      );

    return `${today} até ${today}`;

  }
}
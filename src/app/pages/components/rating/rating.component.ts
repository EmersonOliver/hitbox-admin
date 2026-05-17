import {
  Component,
  forwardRef,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,

      useExisting: forwardRef(
        () => RatingComponent
      ),

      multi: true
    }
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements ControlValueAccessor {
  @Input()
  max = 5;

  @Input()
  readonly = false;

  stars: number[] = [];

  value = 0;

  hoverValue = 0;

  disabled = false;

  ngOnInit(): void {

    this.stars =
      Array.from(
        { length: this.max },
        (_, i) => i + 1
      );
  }

  onChange = (_: number) => { };

  onTouched = () => { };

  writeValue(value: number): void {

    this.value = value || 0;
  }

  registerOnChange(fn: any): void {

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {

    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

    this.disabled = isDisabled;
  }

  rate(star: number): void {

    if (
      this.readonly ||
      this.disabled
    ) {
      return;
    }

    this.value = star;

    this.onChange(this.value);

    this.onTouched();
  }

  setHover(star: number): void {

    if (
      this.readonly ||
      this.disabled
    ) {
      return;
    }

    this.hoverValue = star;
  }

  clearHover(): void {

    this.hoverValue = 0;
  }

  isFilled(star: number): boolean {

    return (
      star <=
      (this.hoverValue || this.value)
    );
  }
}

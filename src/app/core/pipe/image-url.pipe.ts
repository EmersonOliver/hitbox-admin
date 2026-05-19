import {
  Pipe,
  PipeTransform
} from '@angular/core';


@Pipe({

  name: 'imageUrl',

  standalone: true
})
export class ImageUrlPipe
  implements PipeTransform {

  transform(
    value?: string | null
  ): string {

    if (!value) {

      return 'assets/img/no-image.png';
    }

    if (
      value.startsWith('http')
    ) {

      return value;
    }

    return `/api/hitbox${value}`;
  }
}
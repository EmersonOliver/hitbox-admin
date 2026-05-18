import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  show(
    message: string,
    type:
      'success' |
      'danger' |
      'warning' |
      'info' = 'success'
  ): void {

    const toast = {

      id: Date.now(),

      message,

      type
    };

    this.toasts.push(toast);

    setTimeout(() => {

      this.remove(toast.id);

    }, 4000);
  }

  remove(
    id: number
  ): void {

    this.toasts =
      this.toasts.filter(
        toast => toast.id !== id
      );
  }
}
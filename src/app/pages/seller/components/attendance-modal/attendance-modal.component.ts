import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type AttendanceOrigin =
  | 'QR'
  | 'TABLE'
  | 'CODE'
  | 'FAST';

@Component({
  selector: 'app-attendance-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './attendance-modal.component.html',
  styleUrl: './attendance-modal.component.scss'
})
export class AttendanceModalComponent {

  origin: AttendanceOrigin = 'TABLE';

  tableNumber?: number;

  people: number = 1;

  code = '';

  @ViewChild('codeInput')
  codeInput!: ElementRef<HTMLInputElement>;

  @ViewChild('video')
  video!: ElementRef<HTMLVideoElement>;

  private mediaStream?: MediaStream;

  isMobile(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  selectOrigin(origin: AttendanceOrigin) {

    this.origin = origin;

    if (origin === 'CODE') {

      setTimeout(() => {
        this.codeInput?.nativeElement.focus();
      }, 100);

    }

  }

  increasePeople() {
    this.people++;
  }

  decreasePeople() {

    if (this.people > 1) {
      this.people--;
    }

  }

  async openCamera() {

    if (!this.isMobile()) {
      return;
    }

    try {

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: 'environment'
          }
        }
      });

      this.video.nativeElement.srcObject = this.mediaStream;

      await this.video.nativeElement.play();

    } catch (err: any) {

      console.error(err);

      alert(err.name + " - " + err.message);

    }

  }

  stopCamera() {

    if (!this.mediaStream) {
      return;
    }

    this.mediaStream.getTracks().forEach(track => track.stop());

    this.mediaStream = undefined;

  }

  startAttendance() {

    console.log({

      origin: this.origin,
      table: this.tableNumber,
      code: this.code,
      people: this.people

    });

  }

}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-team-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-team-modal.component.html',
  styleUrl: './add-team-modal.component.scss'
})
export class AddTeamModalComponent {

  form: FormGroup;
  users: any[] = [];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({

      name: [
        '',
        Validators.required
      ],
      description: [''],
      leaderId: [null],
      active: [true]

    });
  }
}

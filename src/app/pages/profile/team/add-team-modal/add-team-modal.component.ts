import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserResponse } from '../../../register/models/user.response';
import { UserService } from '../../../../core/user/user.service';
import { ToastService } from '../../../components/toast/toast.service';
import { TeamService } from '../../../../core/team/team.service';

@Component({
  selector: 'app-add-team-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-team-modal.component.html',
  styleUrl: './add-team-modal.component.scss'
})
export class AddTeamModalComponent implements OnInit {

  form: FormGroup;
  owners: UserResponse[] = [];

  @Output()
  saveEmit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private teamService: TeamService) {
    this.form = this.fb.group({
      teamName: [null, Validators.required],
      description: [null],
      teamRole: [null],
      active: [true]
    });
  }
  ngOnInit(): void {
    this.userService.loadUsersByRole('OWNER').subscribe({
      next: response => {
        this.owners = response;
      }
    })
  }

  submitTeam() {
    let payload = this.form.getRawValue();
    this.teamService.postTeam(payload).subscribe({
      next: response => {
        this.toast.show('Efetuado com sucesso!', 'success');
        this.form.reset({
          active: true
        });
        this.saveEmit.emit();
      }, error: (error) => {
        this.toast.show('Ocorreu um erro! ' + error.error.message, 'danger');
      }
    })

  }
}

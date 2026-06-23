import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../../core/utils/passwordmatch-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../../core/auth/guards/token.service';
import { UserService } from '../../../../core/user/user.service';

@Component({
  selector: 'app-onboarding-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './onboarding-user.component.html',
  styleUrl: './onboarding-user.component.scss'
})
export class OnboardingUserComponent implements OnInit {
  companyName?: string;
  teamName?: string;
  form: FormGroup;
  token?: string;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService) {
    this.form = this.fb.group({
      email: [null, Validators.required],
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      password: [null, Validators.required, Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/
        )],
      confirmPassword: [null, Validators.required],
      userRole:[null]
    }, { validators: passwordMatchValidator() });


  }
  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token') || undefined;
    if (this.token) {
      let response = this.tokenService.getTokenInvited(this.token);
      this.companyName = response?.companyName;
      this.teamName = response?.teamName;
      this.form.patchValue({
        email: response?.email,
        userRole:response?.['X-User-Role']
      })
    }

  }


  finishRegistration() {
    let payload = {
      token: this.token,
      name: this.form.get('name')?.value,
      lastname: this.form.get('lastname')?.value,
      password: this.form.get('password')?.value,
      userRole: this.form.get('userRole')?.value
    };
    this.userService.completeRegistration(payload).subscribe({
      next:response=>{
        this.form.reset();
        this.tokenService.clear();
        this.tokenService.setToken(response.token);
        this.router.navigate(['/select-company']);
      }
    })

  }

}

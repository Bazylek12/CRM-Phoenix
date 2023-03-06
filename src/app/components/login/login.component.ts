import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',
      Validators.required),
    isRemembered: new FormControl(false)
  });

  constructor(private _authService: AuthService, private _router: Router, private _cdr: ChangeDetectorRef) {
  }

  onLoginFormSubmitted(loginForm: FormGroup): void {
    if (!loginForm.valid) return;
    this._authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
    }).pipe(take(1))
      .subscribe({
        next: () => this._router.navigate(['/leads']),
        error: (err) => {
          this.loginForm.setErrors({ invalidCredentials: err.error.message })
          this._cdr.detectChanges()
        }
      })
  }
}

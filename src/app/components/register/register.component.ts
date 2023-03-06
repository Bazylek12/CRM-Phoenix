import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {take} from "rxjs/operators";
import {Router} from "@angular/router";
import {PasswordValidator} from "../../validators/password.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  account_validation_messages = {
    'email': [
      {type: 'required', message: 'Email is required'},
      {type: 'email', message: 'Enter a valid email'}
    ],
    'confirm_password': [
      {type: 'required', message: 'Confirm password is required'},
      {type: 'noPasswordMatch', message: 'Passwords do not match'}
    ],
    'password': [
      {type: 'required', message: 'Password is required'},
      {type: 'hasNumber', message: 'Must contain at least 1 number character'},
      {type: 'hasLower', message: 'Must contain at least 1 small character'},
      {type: 'hasUpper', message: 'Must contain at least 1 capital character'},
      {type: 'hasSpecialSymbol', message: 'Must contain at least 1 special character: !@#$%^*()'},
      {type: 'minlength', message: 'Password must be at least 8 characters long'},
    ],
  }

  readonly registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      PasswordValidator.lowerValidator,
      PasswordValidator.numberValidator,
      PasswordValidator.symbolValidator,
      PasswordValidator.upperValidator,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
    isAccepted: new FormControl(false, [Validators.requiredTrue])
  }, [PasswordValidator.passwordsMatch]);

  constructor(private _authService: AuthService, private _router: Router, private _cdr: ChangeDetectorRef) {
  }

  onRegisterFormSubmitted(registerForm: FormGroup): void {
    if (!registerForm.valid) return;
    this._authService.register({
      email: registerForm.value.email,
      password: registerForm.value.password,
    }).pipe(take(1))
      .subscribe({
        next: () => this._router.navigate(['/auth/login']),
        error: (err) => {
          this.registerForm.setErrors({serverError: err.error.message})
          this._cdr.detectChanges()
        }
      })
  }
}

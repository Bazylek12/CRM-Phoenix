import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class PasswordValidator {
  static passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value

    if (!password || !confirmPassword) {
      return null
    }
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({noPasswordMatch: true})
    }
    return null;
  }

  static numberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    let hasNumber = /\d/.test(control.value);
    return !hasNumber ? {hasNumber: true} : null;
  }
  static upperValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    let hasUpper = /[A-Z]/.test(control.value);
    return !hasUpper ? {hasUpper: true} : null;
  }
  static lowerValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    let hasLower = /[a-z]/.test(control.value);
    return !hasLower ? {hasLower: true} : null;
  }
  static symbolValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    let hasSpecialSymbol = /[!@#$%^&*()]/.test(control.value);
    return !hasSpecialSymbol ? {hasSpecialSymbol: true} : null;
  }
}

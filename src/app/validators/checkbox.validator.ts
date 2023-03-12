import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CheckboxValidator {
   static minOneSelected: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const howManySelected = Object.keys(control.value).reduce((acc: string[], curr: string) => {
      if (control.value[curr]) {
        return [...acc, curr];
      } else {
        return acc;
      }
    }, []).length;
    if (howManySelected > 0) {
      return null;
    } else {
      return { minOneSelected: true };
    }
  };

}

import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class BioValidator {
    static sentenceValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const hasTenWords = /(\s\S+){9,}/.test(value);
        const hasTwoSentences = /.+[.!?].+\w+/.test(value);
        const contentValid = hasTenWords && hasTwoSentences

        return contentValid ? null : {correctContent: true};
    }

}

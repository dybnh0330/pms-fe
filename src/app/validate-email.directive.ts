import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from "@angular/forms";

const REGEX =
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export function validateEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value != null) {
      const match = value.match(REGEX);

      if (match === null) {

        return {invalidEmail: "Email không đúng định dạng"};
      }
    }
    return null;
  };
}

@Directive({
  selector: '[validateEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateEmailDirective,
      multi: true,
    },
  ],
})
export class ValidateEmailDirective implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    return validateEmail()(control);
  }

}

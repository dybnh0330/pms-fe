import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

const REGEX =
  /^[0-9]*$/g;

export function validateOnlyNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value != null) {
      const match = value.match(REGEX);

      if (match === null) {

        return {invalid: "Trường thông tin này chỉ gồm các số"};
      }
    }
    return null;
  };
}

@Directive({
  selector: '[validateOnlyNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateOnlyNumberDirective,
      multi: true,
    },
  ],
})
export class ValidateOnlyNumberDirective implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    return validateOnlyNumber()(control);
  }

}

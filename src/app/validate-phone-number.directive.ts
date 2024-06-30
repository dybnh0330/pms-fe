import {Directive} from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from "@angular/forms";


const REGEX =
  /(0[3|5|7|8|9])+([0-9]{8})\b/g;

export function validatePhoneNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value != null) {
      const match = value.match(REGEX);

      if (match === null) {

        return {invalidPhoneNumber: "Số điện thoại không đúng định dạng"};
      }
    }
    return null;
  };
}

@Directive({
  selector: '[validatePhoneNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidatePhoneNumberDirective,
      multi: true,
    },
  ],
})
export class ValidatePhoneNumberDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return validatePhoneNumber()(control);
  }

}


import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators{
  static passwordRepeatValidator(formGroup: FormGroup): ValidationErrors | null{
    const control = formGroup.controls.password;
    const matchingControl = formGroup.controls.repeatPassword;
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

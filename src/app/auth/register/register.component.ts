import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/custom.validator';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  submitForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required
      , Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$*.{}?"!@#%&/,><\':;|_~`^\\]\\[\\)\\(]).{8,}')]),
//   (?=.*[a-z]) The string must contain at least 1 lowercase alphabetical character
//   (?=.*[A-Z]) The string must contain at least 1 uppercase alphabetical character
//   (?=.*[0-9]) The string must contain at least 1 numeric character
//   (?=.[!@#\$%\^&]) The string must contain at least one special character - from the Cognito list found here
//   .{8,} - must be min 8 characters
    repeatPassword: new FormControl('', [Validators.required]),
  },{
    validators: CustomValidators.passwordRepeatValidator
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {}

  onSubmit(){
    this.authService.register(this.submitForm.controls.username.value,
      this.submitForm.controls.email.value,
      this.submitForm.controls.password.value);
  }
}

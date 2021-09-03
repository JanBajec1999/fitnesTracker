import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  submitForm = this.formBuilder.group({
    usernameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {}

  onSubmit(){
    this.authService.login(this.submitForm.controls.usernameOrEmail.value, this.submitForm.controls.password.value);
  }

}

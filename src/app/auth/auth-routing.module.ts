import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, ReactiveFormsModule],
  exports: [RouterModule, LoginComponent, RegisterComponent],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthPageRoutingModule {}

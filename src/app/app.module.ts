import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Amplify} from 'aws-amplify';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthGuardService} from "./services/auth-guard.service";

Amplify.configure({
  Auth: {
    mandatorySignIn:true,
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_plv7wAt6D',
    userPoolWebClientId: '3qs1pj3rc3ouhe6f25eum5lt2s',
    authenticationFlowType: 'USER_PASSWORD_AUTH'
    },
  API: {
    endpoints: [
      {
        name: 'fitnesTrackerAPI',
        endpoint: 'https://cfhkx5lfz9.execute-api.eu-central-1.amazonaws.com/dev'
      }
    ]
  }
});


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AmplifyService, AuthGuardService ],
  bootstrap: [AppComponent],
})
export class AppModule {}

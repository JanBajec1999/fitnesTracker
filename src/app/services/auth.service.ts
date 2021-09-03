import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AmplifyService} from 'aws-amplify-angular';
import {Auth} from "aws-amplify";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedIn = false;

  constructor(private router: Router, private amplifyService: AmplifyService) {
    this.amplifyService.authStateChange$.subscribe(auth => {
      switch (auth.state) {
        case 'signedIn':
          this.signedIn=true;
          break;
        case 'signedOut':
          this.signedIn=false;
          break;
        default:
          this.signedIn=false;
      }
    });
  }

  async login(emailUsername: string, password: string){
    try {
      const user = await Auth.signIn(emailUsername, password);
      console.log(user);
      const tokens = user.getSignInUserSession;
      if(tokens != null){
        console.log('Auth success');
        this.router.navigate(['']);
      }
    }catch (e) {
      console.log(e);
      alert('Auth Failed!');
    }
  }

  async register(username: string, email: string, password: string){
    try {
      const user = await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email
        }
      });
      console.log({user});
      this.router.navigate(['']);
    }catch (e) {
      console.log(e);
      alert('Auth Failed!');
    }
  }

  async signOut() {
    try {
      await Auth.signOut();
      this.router.navigate(['auth']);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}

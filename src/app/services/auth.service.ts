import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AmplifyService} from 'aws-amplify-angular';
import {Auth} from 'aws-amplify';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedIn = false;
  currentUser: User;

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
        this.currentUser = this.getUserFromDB();
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

  getUser(): Promise<any> {
    return Auth.currentSession()
      .then(data =>
        // console.log(data.getIdToken().payload.email);
        // console.log(data.getIdToken().payload['cognito:username']);
        //console.log(data.getIdToken().getJwtToken());
         ({username: data.getIdToken().payload['cognito:username'], email: data.getIdToken().payload.email, jwt: data.getIdToken().getJwtToken()})
      )
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  getUserFromDB(){   //return User
    this.getUser().then(data => {
      const email = data.email;
      const myInit = {
        headers: {
          Authorization: data.jwt
        },
        response: true,
        queryStringParameters: {}
      };
    })
  }
}

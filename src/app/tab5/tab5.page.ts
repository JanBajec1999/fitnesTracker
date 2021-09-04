import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  username = '';
  email = '';
  jwt = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUser().then(data => {
      this.username = data.username;
      this.email = data.email;
      this.jwt = data.jwt;
    });
  }

  signOut(){
    this.authService.signOut();
    this.router.navigate(['']);
  }
}

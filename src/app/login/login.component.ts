import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAuthenticated = false;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.hasLoggedIn$.subscribe(() => {
      this.isAuthenticated = true;
    });
    this.auth.sessionHasExpired$.subscribe(() => {
      this.isAuthenticated = false;
    });
  }

  onLogin() {
    this.auth.login();
  }
}

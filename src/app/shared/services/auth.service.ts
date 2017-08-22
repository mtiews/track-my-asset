import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as auth0 from 'auth0-js';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  
  auth0 = new auth0.WebAuth({
    clientID: 'f1G413kRXgqQWOuuY5nXhFeRnlluOu6e',
    domain: 'tiews.eu.auth0.com',
    audience: 'https://tiews.eu.auth0.com/userinfo',
    redirectUri: environment.auth0RedirectUri,      
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor(private router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/login']);
        console.log(err);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}

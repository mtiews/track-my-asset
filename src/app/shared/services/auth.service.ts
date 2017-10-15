import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import * as auth0 from 'auth0-js';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  
  private _isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticatedSource.asObservable();

  private _userInfoSource = new BehaviorSubject<UserInfo>(null);
  public userInfo$ = this._userInfoSource.asObservable();
  
  private currentUserInfo: UserInfo;
  
  auth0 = new auth0.WebAuth({
    clientID: 'f1G413kRXgqQWOuuY5nXhFeRnlluOu6e',
    domain: 'tiews.eu.auth0.com',
    audience: 'https://tiews.eu.auth0.com/userinfo',
    redirectUri: environment.auth0RedirectUri,      
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  constructor() { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);        
      } else if(err) {
        console.log('Authentication Error: ' + err);
      }

      const that = this;      
      if(this.isAuthenticated()) {
        this.auth0.client.userInfo(localStorage.getItem('access_token'), function(err, user) {
          if(user) {
            that.currentUserInfo = new UserInfo(user.email, user.name, user.email_verified);
          } else if(err) {
            console.log('Getting UserInfo failed: ' + err);
            that.currentUserInfo = null;
          }
          that._userInfoSource.next(that.currentUserInfo);
        });
      }
      this._isAuthenticatedSource.next(this.isAuthenticated());
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
    
    this._userInfoSource.next(null);
    this._isAuthenticatedSource.next(this.isAuthenticated());
  }

  private isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAtJson = localStorage.getItem('expires_at');
    if(expiresAtJson == null) {
      return false;
    }
    const expiresAt = JSON.parse(expiresAtJson);
    return new Date().getTime() < expiresAt;
  }

  public getIdToken() {
    return localStorage.getItem('id_token');
  }

  public getCurrentUserInfo() {
    return this.currentUserInfo;
  }
}

export class UserInfo {
  constructor(public mail: string, public name: string, public mailVerified: boolean) {}
}
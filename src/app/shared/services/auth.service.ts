import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

import * as auth0 from 'auth0-js';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  
  private _userInfoSource = new BehaviorSubject<UserInfo>(null);
  public userInfo$ = this._userInfoSource.asObservable();
  
  private _hasLoggedInSource = new Subject<any>();
  public hasLoggedIn$ = this._hasLoggedInSource.asObservable();
  
  private _sessionHasExpiredSource = new Subject<any>();
  public sessionHasExpired$ = this._sessionHasExpiredSource.asObservable();
  
  private currentUserInfo: UserInfo;
  
  auth0 = new auth0.WebAuth({
    clientID: environment.auth0_clientID,
    domain: environment.auth0_domain,
    audience: environment.auth0_audience,
    redirectUri: environment.auth0_redirectUri,      
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
        this._hasLoggedInSource.next(null);
      } else if(err) {
        console.log('Authentication Error: ' + err);
      }
      const that = this;      
      if(this.checkIfIsAuthenticated()) {
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
    this._sessionHasExpiredSource.next();
  }

  public checkIfIsAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAtJson = localStorage.getItem('expires_at');
    if(expiresAtJson == null) {
      this.logout();
      return false;
    }
    const expiresAt = JSON.parse(expiresAtJson);
    const result = new Date().getTime() < expiresAt;
    if(!result) {
      this.logout();
    }
    return result;
  }

  public getIdToken() {
    this.checkIfIsAuthenticated();
    return localStorage.getItem('id_token');
  }

  public getCurrentUserInfo() {
    this.checkIfIsAuthenticated();
    return this.currentUserInfo;
  }
}

export class UserInfo {
  constructor(public mail: string, public name: string, public mailVerified: boolean) {}
}
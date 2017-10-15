import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  smallScreen = false;
  sidenavMode = 'side';
  sidenavOpened = false;
 
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
      if(authenticated) {
        this.router.navigate(['/list']);
      } else {
        this.router.navigate(['/login']);  
      }
    });
    this.auth.handleAuthentication();
    this.configureSideNav();
  }

  onLogout() {
    this.auth.logout();
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.configureSideNav();
  }
  
  configureSideNav() {
    this.smallScreen = window.innerWidth < 701 ? true : false;
    if (!this.smallScreen) {
      this.sidenavMode = 'side';
      this.sidenavOpened = true;
    } else {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    }
  }

  closeSideNav() {
    if(this.smallScreen) {
      this.sidenav.close();
    }
  }
}

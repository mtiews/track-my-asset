import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = null;
  smallScreen = false;
  sidenavMode = 'side';
  sidenavOpened = false;
 
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.auth.hasLoggedIn$.subscribe(() => {
        this.isAuthenticated = true;
        this.router.navigate(['']);
    });
    this.auth.sessionHasExpired$.subscribe(() => {
      console.log('AppComponent: Session has expired!')
      this.isAuthenticated = false;
      this.router.navigate(['/login']);
    });
    this.isAuthenticated = this.auth.checkIfIsAuthenticated();
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

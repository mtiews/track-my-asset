import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onLogout() {
    this.auth.logout();
  }
}

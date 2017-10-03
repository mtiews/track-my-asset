import { Component, OnInit } from '@angular/core';
import { AuthService, UserInfo } from '../shared/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public userInfo: UserInfo;

  constructor(private auth: AuthService) { 
  }

  ngOnInit() {
    this.auth.userInfo$.subscribe((userInfo) => {
      this.userInfo = userInfo;
      console.log('Userinfo changed...');
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/singleComponentServices/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','../app.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  seeAdmin() {
    if (localStorage.length !== 0) {
      return JSON.parse(localStorage.getItem('isAdmin')).isAdmin;
    } else {
      return false;
    }
  }

  seeAuth() {
    if (localStorage.length !== 0) {
      return JSON.parse(localStorage.getItem('isAuth')).isAuth;
    } else {
      return false;
    }
  }

}

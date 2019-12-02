import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/singleComponentServices/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  seeAdmin() {
    return JSON.parse(localStorage.getItem('isAdmin')).isAdmin;
  }

}

import { Component, OnInit } from '@angular/core';
import {IdDeleteAccount} from './account.interface';
import {AccountService} from '../../services/profileServices/account.service';
import {AuthService} from '../../services/singleComponentServices/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../../app.component.css']
})
export class AccountComponent implements OnInit {

  dataId: IdDeleteAccount = {
    idUser: null,
  };

  constructor(private accountService: AccountService, private authService: AuthService) {
    this.dataId.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
  }

  ngOnInit() {
  }

  deleteAccount(data: IdDeleteAccount) {
    this.authService.signOut();
    this.accountService.deleteAccount(data);
  }
}

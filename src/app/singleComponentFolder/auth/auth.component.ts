import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {DataAuth} from './auth.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css', '../../app.component.css']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;
  adminStatus: boolean;

  auth: DataAuth = {
    mail: '',
    password: ''
};

  authFailed: string;
  constructor(private authService: AuthService, private router: Router) { console.log('Coucou');
  }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn(validationStatus: boolean) {
    console.log('Validation : ' + validationStatus);
    switch (validationStatus) {
      case true: {
        this.authService.signIn().then(
          () => {
            this.authStatus = this.authService.isAuth;
            this.adminStatus = this.authService.isAdmin;
            this.router.navigate(['accueil']);
          }
        );
        break;
      }
      case false: {
        this.authFailed = 'Identifiants de connexion érronés';
        break;
      }
      default: {
        console.log('Nothing happens');
      }
    }
  }

  onClickSignIn() {
    this.authService.authentification(this.auth)
      .then((validationStatus: boolean) => {
      this.onSignIn(validationStatus);})
      .catch(() => {
      this.authFailed = 'Erreur avec la database';
    });
  }

  onSignInAdmin() {
    this.authService.signInAdmin().then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.adminStatus = this.authService.isAdmin;
        this.router.navigate(['admin']);
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
    this.adminStatus = this.authService.isAdmin;
  }

  toInscr() {
    this.router.navigate(['inscrire']);
  }
}

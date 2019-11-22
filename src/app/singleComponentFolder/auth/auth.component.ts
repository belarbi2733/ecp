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

  onSignIn(validationStatus: number) {
    console.log('Validation : ' + validationStatus);
    switch (validationStatus) {
      case 2: {
        this.authService.signIn().then(
          () => {
            this.authStatus = this.authService.isAuth;
            this.adminStatus = this.authService.isAdmin;
            this.router.navigate(['accueil']);
          }
        );
        break;
      }
      case 1: {
        console.log('Identifiants de connexion érronés');
        break;
      }
      case 0: {
        console.log('Erreur avec la database');
        break;
      }
      default: {
        console.log('Nothing happens');
      }
    }
  }

  onClickSignIn() {
    this.authService.authentification(this.auth, this.onSignIn);
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

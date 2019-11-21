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
  validationStatus = -1;

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

  onSignIn() {
    console.log('Validation : ' + this.validationStatus);
    if (this.validationStatus === 0) { // Erreur
      this.authFailed = 'Erreur avec la database';
    } else {
      if (this.validationStatus === 2) { // Right password
        this.authService.signIn().then(
          () => {
            this.authStatus = this.authService.isAuth;
            this.adminStatus = this.authService.isAdmin;
            this.router.navigate(['accueil']);
          }
        );
      } else {
        // Wrong password
          this.authFailed = 'Identifiants de connexion érronés';
        }
    }
  }
  onClickSignIn() {
    console.log(this.authService.authentification(this.auth, this.onSignIn));
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

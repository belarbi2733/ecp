import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/singleComponentServices/auth.service';
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
  constructor(private authService: AuthService, private router: Router) {
    this.authStatus = this.authService.isAuth;
    this.adminStatus = this.authService.isAdmin;
  }

  ngOnInit() {
    // console.log(this.authStatus + ' et ' + this.adminStatus);
    if (this.authStatus) { // Si on arrive connecté sur la page d'authentification => on a cliqué sur déconnexion et donc on se déco direct
      this.onSignOut();
    }
  }

  onSignIn(validationStatus: boolean) {
    console.log('Validation : ' + validationStatus);
    switch (validationStatus) {
      case true: {
        this.authService.signIn(this.auth).then(
          () => {
            this.authStatus = this.authService.isAuth;
            this.authService.setAdmin(this.auth).then(
              () => {
                this.adminStatus = this.authService.isAdmin;
                if(this.adminStatus == false) {
                  this.router.navigate(['accueil']);
                } else if(this.adminStatus == true) {
                  this.router.navigate(['admin']);
                }
              }
            );
          }
        );
        break;
      }
      case false: {
        this.authFailed = 'Identifiants de connexion érronés ou Adresse mail non activée (vérifiez votre boite mail)';
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
        this.onSignIn(validationStatus);
        if (validationStatus) {  // Si l'authentification est vérifiée
          // On sauvegarde l'idUser en variable de session avec localStorage
          this.authService.getIdForLocalStorage(this.auth).then((idUser: number) => {
            console.log('idUser : ' + idUser);
            const idJson = {id: idUser};
            localStorage.setItem('idUser', JSON.stringify(idJson));
          })
            .catch(() => {
              console.log('Error in getIdForLocalStorage');
            });
        }
      })
      .catch(() => {
        this.authFailed = 'Erreur avec la database';
      });
  }

  onSignOut() {
    this.authService.signOut().then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.adminStatus = this.authService.isAdmin;
        this.router.navigate(['accueil']);
      }
    );
  }

  toInscr() {
    this.router.navigate(['inscrire']);
  }
}

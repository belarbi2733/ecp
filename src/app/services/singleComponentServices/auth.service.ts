import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataAuth} from '../../singleComponentFolder/auth/auth.interface';
import {ServerconfigService} from '../../serverconfig.service';

@Injectable()
export class AuthService {

  isAuth: boolean;
  isAdmin: boolean;

  constructor(private http: HttpClient, private servUrl: ServerconfigService) {
    if (localStorage.length !== 0) {
      this.isAuth = JSON.parse(localStorage.getItem('isAuth')).isAuth;
      this.isAdmin = JSON.parse(localStorage.getItem('isAdmin')).isAdmin;
      // console.log(this.isAuth + ' et 2 ' + this.isAdmin);
    } else {
      this.isAuth = false;
      this.isAdmin = false;
    }
  }

  url = this.servUrl.nodeUrl;

  signIn(data: DataAuth) {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve();
          }, 0
        );
      }
    );
  }

  signOut() {
    return new Promise(
      (resolve, reject) => {
        this.isAuth = false;
        this.isAdmin = false;
        localStorage.clear();
        // On le vide puis on le remplit avec les valeurs par défaut
        const isAuthJson = {isAuth: false};
        localStorage.setItem('isAuth', JSON.stringify(isAuthJson)); // Stockage de is Auth par défaut dans localstorage

        const isAdminJson = {isAdmin: false};
        localStorage.setItem('isAdmin', JSON.stringify(isAdminJson)); // Stockage de is Admin par défaut dans localstorage

        const idJson = {id: -1};
        localStorage.setItem('idUser', JSON.stringify(idJson)); // Stockage de idUser par défaut dans localstorage
        resolve();
      }
    );
  }

  setAdmin(data: DataAuth){
    return new Promise(
      (resolve, reject) => {
        this.http.post(`${this.url}/login/checkAdmin`, data)
          .subscribe(
            res => {
              console.log('Check admin : ' + res);
              if (res === true) {
                console.log('Admin');
                this.isAdmin = true;
              } else {
                if (res === false) {
                  console.log('Pas admin');
                  this.isAdmin = false;
                }
              }
              this.setUpBooleanAuth(); // Remplissage de localStorage
              resolve();
            },
            err => {
              console.log('Error occured:' + err);
              reject();
            }
          );
      });
  }

  setUpBooleanAuth() {
    const isAuthJson = {isAuth: this.isAuth};
    localStorage.setItem('isAuth', JSON.stringify(isAuthJson)); // Stockage de is Auth dans localstorage

    const isAdminJson = {isAdmin: this.isAdmin};
    localStorage.setItem('isAdmin', JSON.stringify(isAdminJson)); // Stockage de is Admin dans localstorage
    console.log("localStorage : " + localStorage);
  }

  authentification(data: DataAuth) {
    return new Promise(
      (resolve, reject) => {
        this.http.post(`${this.url}/login/checkPassword`, data)
          .subscribe(
            res => {
              console.log('Auth : ' + res);
              if (res === true) {
                console.log('Bon password');
              } else {
                if (res === false) {
                  console.log('Mauvais password');
                }
              }
              resolve(res); // Renvoie true ou false selon si bon ou pas
            },
            err => {
              console.log('Error occured:' + err);
              reject();
            }
          );
      });
  }

  getIdForLocalStorage(data: DataAuth) {
    return new Promise((resolve, reject) => {
      console.log('getIdForLocalStorage() : ');
      this.http.post(`${this.url}/login/getId`, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.log('Error occured in getId:' + err);
          reject();
        }
      );
    });
  }
}

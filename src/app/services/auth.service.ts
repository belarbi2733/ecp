import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {DataAuth} from '../singleComponentFolder/auth/auth.interface';
import {getCallDecoratorImport} from '@angular/core/schematics/utils/typescript/decorators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  url = 'http://localhost:8080';
  isAuth = false;
  isAdmin = false;

  signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            this.isAdmin = false;
            resolve(true);
          }, 0
        );
      }
    );
  }

  signInAdmin() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            this.isAdmin = true;
            resolve(true);
          }, 0
        );
      }
    );
  }

  signOut() {
    this.isAuth = false;
    this.isAdmin = false;
  }

  authentification(data: DataAuth) {
    return new Promise(
      (resolve, reject) => {
        this.http.post(`${this.url}/auth/checkPassword`, data)
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
      this.http.post(`${this.url}/auth/getId`, data).subscribe(
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


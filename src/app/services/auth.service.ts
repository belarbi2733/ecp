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

  authentification(data: DataAuth, onSignIn: () => void): number {
    let validationStatus = -1;
    this.http.post(`${this.url}/auth`, data)
      .subscribe(
        res => {
          console.log('Auth : ' + res);
          if (res === true) {
            console.log('Bon password');
            validationStatus = 2; // Right password
            console.log(validationStatus);
            onSignIn();
          } else {
            if (res === false) {
              console.log('Mauvais password');
              validationStatus = 1; // Wrong password
              console.log(validationStatus);
              onSignIn();
            }
          }
        },
        err => {
          console.log('Error occured:' + err);
          validationStatus = 0;
          onSignIn();
        }
      );
    return validationStatus;
  }
}

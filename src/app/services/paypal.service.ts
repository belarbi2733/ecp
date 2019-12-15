import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PaypalInterface } from '../paypal/paypal.interface';

@Injectable()
export class PaypalService {
  constructor(private http: HttpClient, private router: Router) {}
  url = 'http://localhost:8081';

  getPricePaypal(data){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/paypal`, data)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log('Error', err);
            reject();
          }
        );
    });
  }
}
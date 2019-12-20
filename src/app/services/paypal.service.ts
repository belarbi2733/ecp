import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PaypalInterface } from '../paypal/paypal.interface';

@Injectable()
export class PaypalService {
  constructor(private http: HttpClient, private router: Router) {}
  url = 'http://localhost:8081';

  getPricePaypal(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/paypal/calculPrix`, data)
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

  statusPayPass(data: PaypalInterface) {
    this.http.post(`${this.url}/paypal/changeStatus`, data)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['accueil']);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
  }
}

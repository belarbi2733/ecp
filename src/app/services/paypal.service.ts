import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PaypalInterface } from '../paypal/paypal.interface';
import { MesTrajInterface } from '../reservations/mes-traj/mes-traj.interface';

@Injectable()
export class PaypalService {
  constructor(private http: HttpClient, private router: Router) {}
  url = 'http://localhost:8081';

  getPricePaypal(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/paypal/getPrix`, data)
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

  getMyTraj(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/paypal/mon-traj`, data)
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

  statusPayPass(data: MesTrajInterface) {
    this.http.post(`${this.url}/paypal/changeStatus`, data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
  }
}

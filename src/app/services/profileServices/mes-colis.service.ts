import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class MesColisService {
  constructor(private http: HttpClient, private router: Router) {}
  url = 'http://localhost:8081';

  getAllColis(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/profile/mes-colis`, data)
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminListUtInterface } from '../adminFolder/admin-list-ut/admin-list-ut.interface';

@Injectable()
export class AdminListUtService {
  constructor(private http: HttpClient, private router: Router) {}
  url = 'http://localhost:8081';

  getAllUser(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/admin-list-ut`, data)
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

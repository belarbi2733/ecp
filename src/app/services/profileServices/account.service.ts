import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient, private router: Router) { }
  url = 'http://localhost:8080';
  deleteAccount(data) {
    this.http.post(`${this.url}/deleteAccount`, data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
    this.router.navigate(['accueil']);
  }

}

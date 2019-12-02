import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class InscrService {
  constructor(private http: HttpClient, private router: Router) { }
  url = 'http://localhost:8080';
  getInscr() {
    return this
      .http
      .get(`${this.url}/inscription`);
  }
  inscription(data) {
    this.http.post(`${this.url}/inscription`, data)
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

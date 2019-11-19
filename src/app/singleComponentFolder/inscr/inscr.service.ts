import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class InscrService {
  constructor(private http: HttpClient, private router: Router) { }
  url = 'http://localhost:8080';
  getInscr() {
    if (this.http.get(`${this.url}/inscription`)) {
      this.router.navigate(['accueil']);
      return this
        .http
        .get(`${this.url}/inscription`);
    } else {
      return null;
    }
  }
  inscription(data) {
    this.http.post(`${this.url}/inscription`, data)
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

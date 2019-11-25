import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddtrajetService {
  constructor(private router: Router, private http: HttpClient) { }
  addtrajet(data) {
    this.http.post(`http://localhost:8080/addtrajet`, data)
      .subscribe(
        res => {
          this.router.navigate(['accueil']);
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );

  }
}

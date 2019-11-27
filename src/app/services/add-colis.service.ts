import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AddColisService {
  constructor(private http: HttpClient, private router: Router) { }
  url = 'http://localhost:8080';
  getAddCol() {
    return this
      .http
      .get(`${this.url}/ajoutColis`);
  }

  addColis(data) {
    this.http.post(`${this.url}/addColis`, data)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['accueil']);
        },
        err => {
          console.log('Erreur avec ajout colis:' , err);
        }
      );
  }
}

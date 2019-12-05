import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { ServerconfigService } from '../serverconfig.service';

@Injectable()
export class AddColisService {
  constructor(private http: HttpClient, private router: Router, private rurl:ServerconfigService) { }
  url = this.rurl.nodeUrl;
  getAddCol() {
    return this
      .http
      .get(`${this.url}/ajoutColis`);
  }

  addColis(data) {
    console.log('CC');
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

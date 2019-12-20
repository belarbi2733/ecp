import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerconfigService} from '../../serverconfig.service';
import { DataColis } from '../../singleComponentFolder/add-colis/add-colis.interface';

@Injectable()
export class AddColisService {
  constructor(private http: HttpClient, private router: Router, private servUrl: ServerconfigService) { }
  url = this.servUrl.nodeUrl;

  addColis(data: DataColis) {
    this.http.post(`${this.url}/colis/add`, data)
      .subscribe(
        res => {
          console.log(res);
          // this.router.navigate(['accueil']);
        },
        err => {
          console.log('Erreur avec ajout colis:' , err);
        }
      );
  }
}

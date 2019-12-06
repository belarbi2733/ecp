import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerconfigService} from '../../serverconfig.service';
import { DataTrajet} from '../../singleComponentFolder/add-trajet/add-trajet.interface';

@Injectable()
export class AddtrajetService {
  constructor(private router: Router, private http: HttpClient, private rurl: ServerconfigService) { }

  url = this.rurl.nodeUrl;


  addtrajet(data: DataTrajet) {
    this.http.post(`${this.url}/addtrajet`, data)
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

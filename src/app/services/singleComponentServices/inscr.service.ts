import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerconfigService } from '../../serverconfig.service';
import { DataInscription } from '../../singleComponentFolder/inscr/inscr.interface';

@Injectable()
export class InscrService {
  constructor(private http: HttpClient, private router: Router, private servUrl: ServerconfigService) { }
  url = this.servUrl.nodeUrl;

  inscription(data: DataInscription) {
    this.http.post(`${this.url}/login/inscription`, data)
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

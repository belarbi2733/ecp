import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerconfigService} from '../../serverconfig.service';
import { DataLienInscription } from '../../singleComponentFolder/lien-inscr/lien-inscr.interface';

@Injectable()
export class LienInscrService {
  constructor(private http: HttpClient, private router: Router, private servUrl: ServerconfigService) { }
  url = this.servUrl.nodeUrl;

  lienInscr(data: DataLienInscription) {
    this.http.post(`${this.url}/inscriptionLien`, data)
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

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerconfigService} from '../serverconfig.service';
import { ValidationTrajet} from './validationtrajet.interface';

@Injectable()
export class ValidationTrajetService {
  constructor(private router: Router, private http: HttpClient, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;


  validationtrajet(data: ValidationTrajet) {
    this.http.post(`${this.url}/validation/validationtrajet`, data)
      .subscribe(
        res => {
          // this.router.navigate(['accueil']);
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );

  }
}

  
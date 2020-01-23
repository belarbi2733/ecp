import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerconfigService} from '../../serverconfig.service';
import { Trajet} from '../../singleComponentFolder/add-trajet/add-trajet.interface';

@Injectable()
export class AddtrajetService {
  constructor(private router: Router, private http: HttpClient, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;


  addtrajet(data: Trajet) {
    return new Promise((resolve,reject) => {
      this.http.post(`${this.url}/trajet/add`, data)
      .subscribe(
        res => {
          console.log(res);
          resolve();
        },
        err => {
          //console.log('Error occured:' , err);
          reject(err);
        }
      );
    });

  }
}

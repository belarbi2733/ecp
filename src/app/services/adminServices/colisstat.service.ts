import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerconfigService } from '../../serverconfig.service';

@Injectable()
export class ColisStatService {

  constructor(private http: HttpClient, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;

  getNbreColisTab(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminColisStat/getNbreColisTab`, data)
        .subscribe(
          res => {
            console.log(res);
            resolve(res);
          },
          err => {
            console.log('Error occured:' , err);
            reject();
          }
        );
    });
  }

}

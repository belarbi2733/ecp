import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerconfigService } from '../../serverconfig.service';

@Injectable()
export class TournStatService {

  constructor(private http: HttpClient, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;

  getNbreTournTab(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminDashBoard/getNbreTournTab`, data)
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

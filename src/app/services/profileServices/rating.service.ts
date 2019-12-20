import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerconfigService } from '../../serverconfig.service';

@Injectable()
export class RatingService {

  constructor(private http: HttpClient, private servUrl: ServerconfigService) { }
  url = this.servUrl.nodeUrl;

  getRatingById(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/profile/rating`, data)
        .subscribe(
          res => {
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

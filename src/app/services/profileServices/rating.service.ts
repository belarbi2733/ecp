import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RatingService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8080';

  getRatingById(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/rating`, data)
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

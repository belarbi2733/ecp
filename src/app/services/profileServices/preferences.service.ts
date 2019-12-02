import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PreferencesService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8080';

  updatePref(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/pref/update`, data)
        .subscribe(
          res => {
            console.log(res);
            resolve();
          },
          err => {
            console.log('Error occured:' , err);
            reject();
          }
        );
    });
  }

  getUserPrefById(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/pref/getPref`, data)
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

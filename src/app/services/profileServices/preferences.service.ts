import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerconfigService } from '../../serverconfig.service';

@Injectable()
export class PreferencesService {

  constructor(private http: HttpClient, private servUrl: ServerconfigService) { }
  url = this.servUrl.nodeUrl;

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

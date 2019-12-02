import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PersonalDataService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8080';

  updatePersonalData(data) {
    this.http.post(`${this.url}/personalData/update`, data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
  }

  getUserDataById(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/personalData/getDataUser`, data)
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

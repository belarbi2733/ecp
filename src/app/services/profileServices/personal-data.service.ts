import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerconfigService} from '../../serverconfig.service';

@Injectable()
export class PersonalDataService {

  constructor(private http: HttpClient, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;

  updatePersonalData(data) {
    this.http.post(`${this.url}/profile/personalData/update`, data)
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
      this.http.post(`${this.url}/profile/personalData/getDataUser`, data)
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

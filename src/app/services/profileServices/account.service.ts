import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerconfigService } from '../serverconfig.service';

@Injectable()
export class PersonalDataService {
  constructor(private http: HttpClient, private router: Router, private url:ServerconfigService) { }
  updatePersonalData(data) {
    let serviceUrl=this.url.nodeUrl;
    this.http.post(`${serviceUrl}/updatePerso`, data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
  }
}

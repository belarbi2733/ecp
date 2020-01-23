import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerconfigService} from '../../serverconfig.service';

@Injectable()
export class PhotoService {
  constructor(private http: HttpClient, private router: Router, private servUrl: ServerconfigService) { }


  url = this.servUrl.nodeUrl; 

  displayPhoto(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/profile/display`, data)
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

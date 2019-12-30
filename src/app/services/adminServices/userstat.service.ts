import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerconfigService} from '../../serverconfig.service';

@Injectable()
export class UserStatService {

  constructor(private http: HttpClient, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;

  getNbreUsers(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminDashBoard/getNbreUsers`, data)
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

  getNbreColis(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminDashBoard/getNbreColis`, data)
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

  getNbreTraj(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminDashBoard/getNbreTraj`, data)
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

  getNbreTourn(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminDashBoard/getNbreTourn`, data)
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

  getNbreCond(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminDashBoard/getNbreCond`, data)
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

  getNbreColisLivr(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminDashBoard/getNbreColisLivr`, data)
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

  getNbreTrajEffec(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminDashBoard/getNbreTrajEffec`, data)
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

  getNbreTournEffec(data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/adminDashBoard/getNbreTournEffec`, data)
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

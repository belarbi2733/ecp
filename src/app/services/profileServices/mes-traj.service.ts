import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MesTrajInterface} from '../../reservations/mes-traj/mes-traj.interface';


@Injectable()
export class MesTrajService {
  constructor(private http: HttpClient , private router: Router) {}
  url = 'http://localhost:8081';

  getMyTraj(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/profile/mes-traj`, data)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log('Error', err);
            reject();
            }
        );
    });
  }

  updateStatus(data: MesTrajInterface) {
    this.http.post(`${this.url}/profile/mes-trajupd`, data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error', err);
        }
      );
  }
}

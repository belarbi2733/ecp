import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminListTrajInterface} from '../adminFolder/admin-list-traj/admin-list-traj.interface';

@Injectable()
export class DataTrajService {
  constructor(private http: HttpClient, private router: Router) { }
  url = 'http://localhost:8081';


  getAllTraj(data)  {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/admin/list-traj`, data)
        .subscribe(
          res => {
            console.log('Test');
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

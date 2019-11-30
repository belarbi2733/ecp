import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DispTrajServ {
  constructor(private router: Router, private http: HttpClient) { }
  dispTraj(data) {
    this.http.get(`http://localhost:8080/admin-list-traj`, data)
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

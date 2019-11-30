import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DispListTraj } from '../adminFolder/admin-list-traj/dispadmintraj.interface';


export class DataTrajService {
  constructor(private http: HttpClient, private router: Router) { }
  url = 'http://localhost:8080';


  dispAdminTraj(data)  {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/admin-list-traj`, data)
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

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from '../searchFolder/map/map.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerconfigService } from 'src/app/serverconfig.service';

@Injectable()
export class DriverService {
  constructor(private http: HttpClient, private router: Router, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;

  matchDriverTrajetforTournee(data: Driver) {
    this.http.post(`${this.url}/findTrajet/matchDriverTrajet`, data)
      .subscribe(
        res => {
          console.log(res);
          // this.router.navigate(['accueil']);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
  }

  findMiniTrajet(data: Driver) {
    this.http.post(`${this.url}/findTrajet/miniTrajet`, data)
      .subscribe(
        res => {
          console.log(res);
          // this.router.navigate(['accueil']);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
  }

  setupVoiture(data: Driver) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/setupVoiture`, data)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}

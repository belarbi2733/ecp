import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from './map.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerconfigService } from 'src/app/serverconfig.service';

@Injectable()
export class DriverService {
  constructor(private http: HttpClient, private router: Router, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;

  matchDriverTrajetforTournee(data: Driver) {
    return this.http.post(`${this.url}/matchDriverTrajet`, data)
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
}

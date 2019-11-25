import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteData } from './map.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DriverService {
  constructor(private http: HttpClient, private router: Router) { }
  //(): Observable<HttpResponse<RouteData[]>> {
  //  return this.http.get<RouteData[]>(
  //    'http://localhost:8080', { observe: 'response' });
  //}
  
  url = 'http://localhost:8080';
  getInscr() {
    return this
      .http
      .get(`${this.url}/inscription`);
  }

  inscription(data:RouteData) {
    return this.http.post(`${this.url}/inscription`, data)
      .subscribe(
        res => {
          console.log(res);
          //this.router.navigate(['accueil']);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
  }
}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from './map.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerconfigService } from 'src/app/serverconfig.service';

@Injectable()
export class DriverService {
  constructor(private http: HttpClient, private router: Router, private rurl:ServerconfigService) { }
  //(): Observable<HttpResponse<RouteData[]>> {
  //  return this.http.get<RouteData[]>(
  //    'http://localhost:8080', { observe: 'response' });
  //}
  
  url = this.rurl.nodeUrl;
  getInscr() {
    return this
      .http
      .get(`${this.url}/inscription`);
  }

  inscription(data:Driver) {
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
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerconfigService } from '../serverconfig.service';

@Injectable()
export class AddtrajetService {
  constructor(private router: Router, private http: HttpClient,private rurl:ServerconfigService) { }
  addtrajet(data) {
    let url = this.rurl.nodeUrl;
    this.http.post(`${url}/addtrajet`, data)
      .subscribe(
        res => {
          this.router.navigate(['accueil']);
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );

  }
}

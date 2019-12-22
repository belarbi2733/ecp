import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerconfigService} from '../../serverconfig.service';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient, private router: Router, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;
  deleteAccount(data) {
    this.http.post(`${this.url}/profile/deleteAccount`, data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
    this.router.navigate(['accueil']);
  }
}

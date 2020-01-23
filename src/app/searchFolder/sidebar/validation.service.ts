import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerconfigService} from '../../serverconfig.service';
import { Validation} from './validation.interface';

@Injectable()
export class ValidationService {
  constructor(private router: Router, private http: HttpClient, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;


  sendmail(data: Validation) {
    this.http.post(`${this.url}/validation/sendmail`, data)
      .subscribe(
        res => {
          // this.router.navigate(['accueil']);
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );

  }
}

  
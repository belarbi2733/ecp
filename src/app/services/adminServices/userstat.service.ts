import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerconfigService} from '../../serverconfig.service';

@Injectable()
export class UserStatService {

  constructor(private http: HttpClient, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;

  getNbreUsers() {
   this.http.get(`${this.url}/adminDashBoard/getNbreUsers`)
      .subscribe(
        res => {
          console.log('Marie tes bonne xD');
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
          console.log('Marie tes chiante');
        }
      );
  }
}

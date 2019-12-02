import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DispTourn} from '../reservations/mes-tourn/mes-tourn.interface';

@Injectable()
export class MesTournService {
  constructor(private http: HttpClient, private router: Router) {}
  url = 'http://localhost:8080';

  dispTourn(data) {
    return new Promise((resolve, reject) => {
     this.http.get(`${this.url}/mes-tourn `, data)
      .subscribe(
        res => {
          console.log('Test Tourn');
          resolve(res);
        },
        err => {
          console.log('Error : ' , err);
          reject();
        }
      );
    });
  }
}

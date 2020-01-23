import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerconfigService } from '../serverconfig.service';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

constructor(private http: HttpClient, private servUrl: ServerconfigService) { }

  url = this.servUrl.nodeUrl;

  sendMessage(subject, mail, content) {

    const parameters = new HttpParams().set('subject', subject).append('mail', mail).set('content', content);

    return this.http.get(`${this.url}/sendmail/contact`, {params : parameters, responseType : 'text'});
  }

  sendMailValid(mail) {
    const parameters = new HttpParams().set('mail', mail);

    return this.http.get(`${this.url}/sendmail/inscription`, {params : parameters, responseType : 'text'});
  }
}

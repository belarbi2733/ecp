import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerconfigService } from '../serverconfig.service';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

constructor(private _httpmail : HttpClient, private url:ServerconfigService) { }
  sendMessage(subject, mail, content){
    let mailServiceUrl = this.url.nodeUrl+'/sendmail/contact';
    let parameters = new HttpParams().set('subject',subject).append('mail', mail).set('content', content);
    // console.log(subject, mail, content);
    return this._httpmail.get(mailServiceUrl, {params : parameters, responseType : 'text'});
    // let callUrl = this.mailServiceUrl+'/${subject}/${mail}/${content}';
    // return this._httpmail.get(callUrl);
  }
} 
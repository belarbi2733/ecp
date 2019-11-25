import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailingService {
mailServiceUrl = "http://localhost:3000/sendmail/contact";
constructor(private _httpmail : HttpClient) { }
  sendMessage(subject, mail, content){
    let parameters = new HttpParams().set('subject',subject).append('mail', mail).set('content', content);
    // console.log(subject, mail, content);
    return this._httpmail.get(this.mailServiceUrl, {params : parameters, responseType : 'text'});
    // let callUrl = this.mailServiceUrl+'/${subject}/${mail}/${content}';
    // return this._httpmail.get(callUrl);
  }
} 
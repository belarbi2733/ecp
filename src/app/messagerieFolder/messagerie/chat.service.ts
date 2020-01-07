import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ServerconfigService} from '../../serverconfig.service';




@Injectable()


export class ChatService {
  url = this.servUrl.nodeUrl;
  idUser = JSON.parse(localStorage.getItem('idUser')).id;
  dataId = {idUser: this.idUser};
  constructor(private http: HttpClient, private servUrl: ServerconfigService) {}

  private socket = io('http://localhost:8081');

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    const observable = new Observable<{idUser: number, user: string, message: string, today: string, time: string}>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });

    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    const observable = new Observable<{idUser: number, user: string, message: string, today: string, time: string}>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });

    return observable;
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    // tslint:disable-next-line:max-line-length
    const observable = new Observable<{idUser: number, nom: string, prenom: string, message: string, today: string, time: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });

    return observable;
  }

  loadMessage() {

    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/message/message`, this.dataId).subscribe(
        res => {
          console.log(res);
          resolve(res);
        }, err => {
          console.log('Error occured:' , err);
          reject();
        }
      );
    });
  }
  getName() {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/message/nom`, this.dataId).subscribe(
        res => {
          console.log(res);
          resolve(res);
        }, err => {
          console.log('Error occured:' , err);
          reject();
        }
      );
    });
  }
  getTournee() {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/message/tournee`, this.dataId).subscribe(
        res => {
          console.log(res);
          resolve(res);
        }, err => {
          console.log('Error occured:' , err);
          reject();
        }
      );
    });
  }
  getMessage(idTournee) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/message/getMessage`, {idTournee}).subscribe(
        res => {
          console.log(res);
          resolve(res);
        }, err => {
          console.log('Error occured:' , err);
          reject();
        }
      );
    });
  }
}

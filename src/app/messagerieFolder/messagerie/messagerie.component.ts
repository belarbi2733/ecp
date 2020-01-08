import { Component, OnInit } from '@angular/core';
import {ChatService} from './chat.service';
import moment from 'moment';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css', '../../app.component.css']
})
export class MessagerieComponent implements OnInit {
  room: number;
  today;
  time;
  idUser;
  messageText = '';
  messageArray: Array<any> = [];
  user: Array<any> = [];
  tournees: Array<{id_tournee: number, arrivee_address: string}> = [];
  constructor(private chatService: ChatService) {
    this.today = moment().format('YYYY-MM-DD');
    this.time = moment().format('LT');
    this.idUser = JSON.parse(localStorage.getItem('idUser')).id;
    // this.room = 'defautRoom';
    this.chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));

    this.chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  join(idRoom) {
    this.chatService.joinRoom({user: this.user, room: idRoom});
  }

  leave() {
    this.chatService.leaveRoom({user: this.user, room: this.room});
  }

  sendMessage() {
    this.chatService.sendMessage({idUser: this.idUser, nom: this.user[0].nom, prenom: this.user[0].prenom,
      room: this.room, message: this.messageText, today: this.today, time: this.time});
    this.messageText = '';
    console.log('Name of User', this.user[0].nom);
  }

  ngOnInit() {

    this.chatService.getName().then(((data: Array<any>) => {
      this.user = data;
      console.log('CURRENT USER', this.user);
    }));
    this.chatService.getTournee().then((res: any) => {
      this.tournees = res;
    });
  }

  viewMessage(idTournee: number) {
    this.room = idTournee;
    this.join(idTournee);
    this.messageArray = [];
    this.chatService.getMessage(idTournee).then((data: Array<any>) => {
      this.chatService.joinRoom({user: this.user, room: this.room });
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        this.messageArray.push(
          {
            nom: data[i].nom, prenom: data[i].prenom,
            message: data[i].message, today: moment(data[i].message_date).format('YYYY-MM-DD'),
            time: data[i].message_time
          }
        );
      }
    }).catch(err => {
      console.log('error', err);
    });
  }
}

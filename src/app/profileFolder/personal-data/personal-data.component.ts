import { Component, Input, OnInit } from '@angular/core';
import {DataPersonal} from './personal-data.interface';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css', '../../app.component.css']
})
export class PersonalDataComponent implements OnInit {

  personalInfos: DataPersonal = {
    nom: 'Nom',
    prenom: 'Prenom',
    sexe: 'Homme',
    mail: 'Mail',
    tel: '0492456789',
    date_naiss: ''
}

  constructor() { }

  ngOnInit() {
  }

  modifierInfo(data: DataPersonal) {

  }

}

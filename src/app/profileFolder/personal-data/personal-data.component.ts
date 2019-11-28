import { Component, Input, OnInit } from '@angular/core';
import {DataPersonal} from './personal-data.interface';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css', '../../app.component.css']
})
export class PersonalDataComponent implements OnInit {

  personalInfos: DataPersonal = {
    nom: '',
    prenom: '',
    sexe: '',
    mail: '',
    tel: '',
    date_naiss: ''
}

  constructor() { const idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser in localStorage
                  }

  ngOnInit() {
  }

  modifierInfo(data: DataPersonal) {

  }

}

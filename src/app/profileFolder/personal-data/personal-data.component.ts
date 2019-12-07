import { Component, Input, OnInit } from '@angular/core';
import {DataPersonal} from './personal-data.interface';
import {PersonalDataService} from '../../services/profileServices/personal-data.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css', '../../app.component.css']
})
export class PersonalDataComponent implements OnInit {

  personalInfos: DataPersonal = {
    idUser: null,
    nom: '',
    prenom: '',
    sexe: '',
    mail: '',
    tel: '',
    date_naiss: '',
    description: null
};

  error: string;
  constructor(private personalDataService: PersonalDataService) {
    this.personalInfos.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser from localStorage
                  }

  ngOnInit() {
    this.personalDataService.getUserDataById(this.personalInfos)
      .then((dataUser: DataPersonal) => {
        this.personalInfos.nom = dataUser.nom;
        this.personalInfos.prenom = dataUser.prenom;
        this.personalInfos.sexe = dataUser.sexe;
        this.personalInfos.mail = dataUser.mail;
        this.personalInfos.tel = dataUser.tel;
        this.personalInfos.date_naiss = dataUser.date_naiss;
        this.personalInfos.description = dataUser.description;
        console.log(this.personalInfos);
    })
      .catch( () => {
      console.log('Error in getUserDataById');
    });
  }

  modifierInfo(data: DataPersonal) {
    this.error = '';
    if (data.nom === '' || data.prenom === '' || data.sexe === null || data.mail === '' || data.tel === '' || data.date_naiss === '') {
      this.error = 'Certains champs ne sont pas complétés !';
    } else {
      console.log('Update Perso');
      this.personalDataService.updatePersonalData(data);
      this.error = 'Les changements ont bien été enregistrés :)';
    }
  }

}

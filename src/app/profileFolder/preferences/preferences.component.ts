import {Component, OnInit} from '@angular/core';
import { DataPreferences } from './preferences.interface';
import { PreferencesService } from '../../services/profileServices/preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css', '../../app.component.css']
})
export class PreferencesComponent implements OnInit {

  preferences: DataPreferences = {
    idUser: null,
    prefAnimaux: null,
    prefFumer: null,
  };

  error: string;

  constructor(private prefServ: PreferencesService) {
    this.preferences.idUser = JSON.parse(localStorage.getItem('idUser')).id;  // Loading idUser from localStorage
     }

  ngOnInit() {
    this.prefServ.getUserPrefById(this.preferences)
      .then((dataUser: DataPreferences) => {
        if (dataUser.prefAnimaux !== null || dataUser.prefFumer !== null) {
          this.preferences.prefAnimaux = dataUser.prefAnimaux.toString();
          this.preferences.prefFumer = dataUser.prefFumer.toString();
          console.log('Preferences : ' + this.preferences.prefAnimaux + ' et ' + this.preferences.prefFumer);
          this.error = '';
        }
      })
      .catch( () => {
        console.log('Error in getUserPrefById');
        this.error = 'Erreur database !';
      });
  }

  updatePreferences(data: DataPreferences) {
    /*console.log('Pref id :' + this.preferences.idUser);
    console.log('Pref Animaux : ' + this.preferences.prefAnimaux);
    console.log('Pref Fumer : ' + this.preferences.prefFumer);*/
    if (data.prefFumer === null || data.prefAnimaux === null) {
      this.error = 'Tous les champs ne sont pas complétés !';
    } else {
      this.prefServ.updatePref(data)
        .then(() => {
          this.error = 'Vos préférences ont bien été enregistrées';
        })
        .catch(() => {
          console.log('Error in updatePreferences');
          this.error = 'Erreur database !';
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {DataInscription} from './inscr.interface';
import { Injectable } from '@angular/core';
import { InscrService } from '../../services/inscr.service';


@Component({
  selector: 'app-inscr',
  templateUrl: './inscr.component.html',
  styleUrls: ['./inscr.component.css' , '../../app.component.css']
})

@Injectable()
export class InscrComponent implements OnInit {
  inscription: DataInscription = {
    id_utilisateur: null,
    adresse_mail: '',
    mot_passe: '',
    verification_mot_passe: ''
  };

  dataNode: DataInscription[];
  error: string;
  constructor(private inscrService: InscrService) {
  }
  ngOnInit() {
  }
  inscrire(data: DataInscription) {
    if (data.mot_passe === '' || data.verification_mot_passe === '' || data.adresse_mail === '') {
      this.error = 'Certains champs ne sont pas complétés !';
      this.constructor();
    } else {
      if (data.mot_passe === data.verification_mot_passe) {
        this.error = '';
        this.inscrService.inscription(data);
      } else {
        this.error = 'Les mots de passe ne correspondent pas !';
      }
    }
  }
}

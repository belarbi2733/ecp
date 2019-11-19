import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Inscription} from './inscr.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InscrService } from './inscr.service';


@Component({
  selector: 'app-inscr',
  templateUrl: './inscr.component.html',
  styleUrls: ['./inscr.component.css' , '../../app.component.css']
})

@Injectable()
export class InscrComponent implements OnInit {
  inscription: Inscription = {
    id_utilisateur: null,
    adresse_mail: '',
    mot_passe: '',
    verification_mot_passe: ''
  };

  dataNode: Inscription[];
  error: string;
  constructor(private inscrService: InscrService) {
  }
  ngOnInit() {
  }

  inscrire(data: Inscription) {
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

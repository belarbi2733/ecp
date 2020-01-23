import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { DataLienInscription } from './lien-inscr.interface';
import { LienInscrService } from '../../services/singleComponentServices/lien-inscr.service';


@Component({
  selector: 'app-lien-inscr',
  templateUrl: './lien-inscr.component.html',
  styleUrls: ['./lien-inscr.component.css','../../app.component.css']
})

@Injectable()
export class LienInscrComponent implements OnInit {
  lienInscription: DataLienInscription = {
    adresse_mail: '',
    valid_adresse_mail:''
  };

  error: string;

  constructor(private lienInscrService: LienInscrService) {
  }

  ngOnInit() {
  }

  valider(data: DataLienInscription){
    if (data.adresse_mail === '') {
      this.error = 'Certains champs ne sont pas complétés !';
      this.constructor();
    } else {
      if (data.adresse_mail === data.valid_adresse_mail) {
        this.error = '';
        this.lienInscrService.lienInscr(data);
      } else {
        this.error = 'Les mails ne correspondent pas !';
      }
    }
  }

}

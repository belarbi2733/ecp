import { Component, OnInit } from '@angular/core';
import {DataInscription} from './inscr.interface';
import { Injectable } from '@angular/core';
import { InscrService } from '../../services/singleComponentServices/inscr.service';
import { MailingService } from 'src/app/services/mailing.service';


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

  error: string;
  constructor(private inscrService: InscrService, private mailServ: MailingService) {
  }
  ngOnInit() {
  }

  // Dans l'inscription faut vérifier que l'adresse mail n'est pas déjà dans la database !!! A faire

  inscrire(data: DataInscription) {
    if (data.mot_passe === '' || data.verification_mot_passe === '' || data.adresse_mail === '') {
      this.error = 'Certains champs ne sont pas complétés !';
      this.constructor();
    } else {
      if (data.mot_passe === data.verification_mot_passe) {
        this.error = '';
        this.inscrService.inscription(data);
        this.mailServ.sendMailValid(this.inscription.adresse_mail).subscribe((response)=>{
          console.log(response);
        });
      } else {
        this.error = 'Les mots de passe ne correspondent pas !';
      }
    }
  }
}

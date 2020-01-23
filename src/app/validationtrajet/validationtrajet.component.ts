// # Imports
import { Component, OnInit} from '@angular/core';
import {ValidationTrajetService} from './validationtrajet.service'
import { ValidationTrajet } from './validationtrajet.interface';
import { Router } from '@angular/router';


// # Déclarations

let idtrajet :number;

let donnee: ValidationTrajet = {
  idTrajet: null
};

// # Ecriture dans l'instance
function recordValidationTrajet(data: ValidationTrajet) {
  data.idTrajet = idtrajet;
}

// # Création du component
@Component({
  selector: 'app-validationtrajet',
  templateUrl: './validationtrajet.component.html',
  styleUrls: ['./validationtrajet.component.css']
})

// # Création de la classe
export class ValidationTrajetComponent implements OnInit {

  constructor(private router : Router, private validationservice :ValidationTrajetService) {  }
  receivedChildMessage: string;
  alternative = null ;
  
  //console.log(products)
    
    //this.alternative = products;
  


  // #ngOnInit
  ngOnInit() {
    // ## On récupère l'id trajet dans l'url
    console.log (new URL(window.location.href).searchParams.get('idtrajet'));
    
    idtrajet = parseInt( (new URL(window.location.href).searchParams.get('idtrajet')));
    if (typeof idtrajet !== 'undefined') {
      // ## On record l'id du trajet dans l'insance de l'interface
      recordValidationTrajet(donnee);
      console.log (donnee);
      // ## On renvoie au backend afin de valider le trajet
      this.validationservice.validationtrajet(donnee);
    }
  }

}

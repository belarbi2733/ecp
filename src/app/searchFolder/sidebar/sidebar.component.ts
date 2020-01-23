import { Component, Input, OnInit } from '@angular/core';

import { Validation } from './validation.interface';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../validation/confirmation-dialog.service';


declare let L;
declare let tomtom: any;
var products = [];
let dist;
let idtournee = [];


// # Conversion en radians
function toRadians(input){
  return (Math.PI * input)/180;
}

// # Fonction calculant la distance entre les points
function distance (lat1, lat2,lon1,lon2){
  var R =6371e3;
  var φ1= toRadians(lat1);
  var φ2= toRadians(lat2);
  var Δφ=toRadians((lat2-lat1));
  var Δλ=toRadians((lon2-lon1));
  var a =Math.sin(Δφ/2)*Math.sin(Δφ/2)+Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)*Math.sin(Δλ/2);
  var c =2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  return R * c;
}

// # Initialisation de idtournee qui sera utiliser afin d'envoyer les mails aux différents passagers, colis
let donnee: Validation = {
  idTournee: null
};

// # Fonction qui ajoute l'idtournee à l'instance de l'interface Validation
function recordValidation(data: Validation) {
  data.idTournee = idtournee;
}

// # Détail du component
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../../app.component.css']
})

// # Création de la classe
export class SidebarComponent implements OnInit {
  constructor(private router : Router, private confirmationDialogService :ConfirmationDialogService) {  }

  // ## Initialisation de certaines variables
  receivedChildMessage: string;
  alternative = null ;
  // ## Méthode activée si le message est "emit"
  getMessage(message: string) {
    
    // ### On reçoit le message
    this.receivedChildMessage = message;
    console.log(message['parcours'][0]);
    products = [];
    idtournee = [];

    // ### Construction de la sidebar
    for (var it = 1; it < Object.keys(message).length - 1 ; it ++) {
    dist = Math.round (distance (message['adresse' + it][1], message['adresse' + (it+1)][1], message['adresse' + it][2], message['adresse' + (it+1)][2]))/1000;
    if (it < Object.keys(message).length/2){
      if (it > 1){
        idtournee.push(message['adresse' + it][0]);
      }

    }
    
    products.push ({
      name : "Trajet" + it,
      distance : dist
    }) ;
  }
    recordValidation(donnee);
    console.log (donnee);
    this.alternative = products;
  }

  // ## Boite de dialogue de confirmation pour le bouton
  public openConfirmationDialog() {
    // ### Appel du service avec passage de l'instance donnee contenant les idtrajets constitutifs
    this.confirmationDialogService.confirm('Confirmation', 'Voulez vous valider cette tournée ?', donnee)
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  ngOnInit() {
  }

}

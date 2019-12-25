import { Component, Input, OnInit } from '@angular/core';
import { TrajetService } from './trajet';
//import {alternative} from './alternative'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../validation/confirmation-dialog.service';
//var tour ;
declare let L;
declare let tomtom: any;
var products = [];
let dist;

function toRadians(input){
  return (Math.PI * input)/180;
}

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
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../../app.component.css']
})
export class SidebarComponent implements OnInit {

  
  constructor(private trajetserver : TrajetService, private router : Router, private confirmationDialogService :ConfirmationDialogService) {  }
  receivedChildMessage: string;
  alternative = null ;
  getMessage(message: string) {
    this.receivedChildMessage = message;
    console.log(message['parcours'][0]);
    products = [];
    for (var it = 1; it < Object.keys(message).length - 1 ; it ++) {
    dist = Math.round (distance (message['passager' + it][1], message['passager' + (it+1)][1], message['passager' + it][2], message['passager' + (it+1)][2]))/1000;
    
    products.push ({
      name : "Trajet" + it,
      distance : dist
    }) ;
  }
  console.log(products)
    this.alternative = products;
  }


  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Confirmation', 'Voulez vous valider cette tournée ?')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  ngOnInit() {
    //tour = this.trajetserver.getConfig();
    
    //console.log(JSON.stringify(tour));
    
    //console.log(JSON.parse(tour.getItem('parcour')));
  }

}

import { Component, Input, OnInit, Injectable } from '@angular/core';
import {ValidationTrajetService} from './validationtrajet.service'
import { ValidationTrajet } from './validationtrajet.interface';
//import {alternative} from './alternative'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
//var tour ;
declare let L;
declare let tomtom: any;
var products = [];
let dist;
let idtrajet :number;



let donnee: ValidationTrajet = {
  idTrajet: null
};

function recordValidationTrajet(data: ValidationTrajet) {
  data.idTrajet = idtrajet;
  
  //console.log(JSON.stringify(data));


  // console.log(JSON.stringify(data));

}

@Component({
  selector: 'app-validationtrajet',
  templateUrl: './validationtrajet.component.html',
  styleUrls: ['./validationtrajet.component.css']
})

export class ValidationTrajetComponent implements OnInit {

  constructor(private router : Router, private validationservice :ValidationTrajetService) {  }
  receivedChildMessage: string;
  alternative = null ;
  
  //console.log(products)
    
    //this.alternative = products;
  


  
  ngOnInit() {
    console.log (new URL(window.location.href).searchParams.get('idtrajet'));
    
    idtrajet = parseInt( (new URL(window.location.href).searchParams.get('idtrajet')));
    if (typeof idtrajet !== 'undefined') {
      //idtrajet = null;
      recordValidationTrajet(donnee);
      console.log (donnee);
      this.validationservice.validationtrajet(donnee);
    }
    
    //tour = this.trajetserver.getConfig();
    
    //console.log(JSON.stringify(tour));
    
    //console.log(JSON.parse(tour.getItem('parcour')));
  }

}

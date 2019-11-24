import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataColis} from './add-colis.interface';
import {AddColisService} from './add-colis.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Component({
  selector: 'app-add-colis',
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.css', '../../app.component.css']
})
export class AddColisComponent implements OnInit {

  addColis: DataColis = {
  colisNom: '',
  colisDepart: '',
  colisDestination: '',
  colisDate: '',
  colisPoids: null,
  colisVolume: null,
  colisDescription: '',
};
  constructor(private router: Router, private addColisService: AddColisService) { }


  ngOnInit() {
  }

  addCol(data: DataColis) {
  this.addColisService.addColis(data);
  this.router.navigate(['accueil']);
  console.log('Nom colis: ' + data.colisNom);
  console.log('Depart colis: ' + data.colisDepart);
  console.log('Destination colis: ' + data.colisDestination);
  console.log('Date colis: ' + data.colisDate);
  console.log('Poids colis ' + data.colisPoids);
  console.log('Volume colis: ' + data.colisVolume);
  console.log('Description colis: ' + data.colisDescription);

  }

}

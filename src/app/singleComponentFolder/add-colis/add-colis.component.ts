import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataColis} from './add-colis.interface';
import {AddColisService} from '../../services/singleComponentServices/add-colis.service';


@Component({
  selector: 'app-add-colis',
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.css', '../../app.component.css']
})

export class AddColisComponent implements OnInit {

  addColis: DataColis = {
    idUser: 1,
    nom: '',
    depart: '',
    arrivee: '',
    date: '',
    poids: null,
    dimension: null,
    description: '',
};
  constructor(private router: Router, private addColisService: AddColisService) { }


  ngOnInit() {
  }

  addCol(data: DataColis) {
    this.addColisService.addColis(data);
  }

}

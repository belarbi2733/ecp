import { Component, OnInit } from '@angular/core';
import {DataTrajet} from './add-trajet.interface';
import { Injectable } from '@angular/core';
import { AddtrajetService } from '../../services/addtrajet.service';


@Component({
  selector: 'app-add-trajet',
  templateUrl: './add-trajet.component.html',
  styleUrls: ['./add-trajet.component.css', '../../app.component.css']
})

@Injectable()
export class AddTrajetComponent implements OnInit {
  addtraj: DataTrajet = {
    id_utilisateur: null,
    arrivee: '',
    depart: '',
    date: '',
  };

  trajDepart: string;
  trajDestination: string;
  trajDate: string;

  constructor(private addtrajserv: AddtrajetService  ) { }

  ngOnInit() {

  }

  OnclickaddTraj(data: DataTrajet) {

    console.log('Depart: ' + data.depart);
    console.log('Destination: ' + data.arrivee);
    this.addtrajserv.addtrajet(data);
  }

}


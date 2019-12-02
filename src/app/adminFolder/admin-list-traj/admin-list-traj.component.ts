import { Component, Input , OnInit } from '@angular/core';

import {DataTrajService} from '../../services/admin-list-traj.service';

import {DataTrajet} from '../../singleComponentFolder/add-trajet/add-trajet.interface';
import {DispListTraj} from './dispadmintraj.interface';


@Component({
  selector: 'app-admin-list-traj',
  templateUrl: './admin-list-traj.component.html',
  styleUrls: ['./admin-list-traj.component.css']
})



export class AdminListTrajComponent implements OnInit {
  adminListTraj: DispListTraj = {
    idUser: 2,
    depart: 'Test',
    arrivee: 'Test',
    nbrePlaces: 4
  };



  error: string;

  constructor(private  dataTrajService: DataTrajService) {

  }

  ngOnInit() {
    this.dataTrajService.dispAdminTraj(this.adminListTraj)
      .then((dataTrajet: DataTrajet) => {
        this.adminListTraj.arrivee = dataTrajet.arrivee;
        this.adminListTraj.depart = dataTrajet.depart;
        this.adminListTraj.idUser = dataTrajet.id_utilisateur;
        this.adminListTraj.nbrePlaces = dataTrajet.places;
      })
      .catch(() => {
        console.log('Error in getUserDataById');
      });
  }
}


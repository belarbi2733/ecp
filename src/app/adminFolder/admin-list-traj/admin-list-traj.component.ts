import { Component, Input , OnInit } from '@angular/core';
import {DataTrajService} from '../../services/admin-list-traj.service';
import {Trajet} from '../../singleComponentFolder/add-trajet/add-trajet.interface';
import {DispListTraj} from './admin-list-traj.interface';


@Component({
  selector: 'app-admin-list-traj',
  templateUrl: './admin-list-traj.component.html',
  styleUrls: ['./admin-list-traj.component.css', '../../app.component.css']
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
      .then((dataTrajet: Trajet) => {

      })
      .catch(() => {
        console.log('Error in getUserDataById');
      });
  }
}

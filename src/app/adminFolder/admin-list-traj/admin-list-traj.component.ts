import { Component, Input , OnInit } from '@angular/core';
import {DataTrajService} from '../../services/admin-list-traj.service';
import {Trajet} from '../../singleComponentFolder/add-trajet/add-trajet.interface';
import {AdminListTrajInterface} from './admin-list-traj.interface';


@Component({
  selector: 'app-admin-list-traj',
  templateUrl: './admin-list-traj.component.html',
  styleUrls: ['./admin-list-traj.component.css', '../../app.component.css']
})



export class AdminListTrajComponent implements OnInit {
  adminListTrajInterface: AdminListTrajInterface = {
    id: null,
    depart: '',
    arrivee: '',
    nbrePlaces: null
  };



  error: string;

  constructor(private  dataTrajService: DataTrajService) {

  }

  ngOnInit() {
    this.dataTrajService.getAllTraj(this.adminListTrajInterface)
      .then((adminListTrajInterface: AdminListTrajInterface) => {
        this.adminListTrajInterface = adminListTrajInterface;
      })
      .catch(() => {
        console.log('Error in getUserDataById');
      });
  }
}

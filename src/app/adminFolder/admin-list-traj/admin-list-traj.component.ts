import { Component, Input , OnInit } from '@angular/core';
import {AdminListTrajService} from '../../services/admin-list-traj.service';
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
    time: '',
    nbrePlaces: null,
    prix: null,
    colis: '',
    paypal: '',
    paypalcond: '',
    statut: null
  };

  error: string;

  constructor(private  adminListTrajService: AdminListTrajService) {

  }

  ngOnInit() {
    this.adminListTrajService.getAllTraj(this.adminListTrajInterface)
      .then((adminListTrajInterface: AdminListTrajInterface) => {
        this.adminListTrajInterface = adminListTrajInterface;

      })
      .catch(() => {
        console.log('Error in getTrajData dans le ngOnInit');
      });
  }

  paid(data: AdminListTrajInterface) {
    data.statut = 6;
    this.adminListTrajService.updateStatut(data);
  }

  refunded(data: AdminListTrajInterface) {
    data.statut = 5;
    this.adminListTrajService.updateStatut(data);
  }

  delete(data: AdminListTrajInterface) {
    this.adminListTrajService.deleteTraj(data);
    window.location.reload();
  }
}

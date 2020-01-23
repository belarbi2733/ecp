import { Component, OnInit } from '@angular/core';
import {PaypalInterface} from '../../paypal/paypal.interface';
import {PaypalService} from '../../services/paypal.service';
import {MesTrajService} from '../../services/profileServices/mes-traj.service';
import {MesTrajInterface} from './mes-traj.interface';

@Component({
  selector: 'app-mes-traj',
  templateUrl: './mes-traj.component.html',
  styleUrls: ['./mes-traj.component.css', '../../app.component.css']
})
export class MesTrajComponent implements OnInit {
  mesTrajInterface: MesTrajInterface = {
    id: null,
    heureDepart: '',
    lieuDepart: '',
    lieuArrivee: '',
    prix: null,
    idUser: null,
    status: '',
    etatStatus : null
  };
  constructor(private mesTrajService: MesTrajService) {
    this.mesTrajInterface.idUser = JSON.parse(localStorage.getItem('idUser')).id;
  }

  ngOnInit() {
    this.mesTrajService.getMyTraj(this.mesTrajInterface)
      .then((mesTrajInterface: MesTrajInterface) => {
        this.mesTrajInterface = mesTrajInterface;
      })
      .catch(() => {
        console.log('Error in mes-trajComponent');
      });
  }

   /*updateStatus(data: MesTrajInterface){
     data.etatStatus = 0;
     this.mesTrajService.updateStatus(data);
     console.log(data);
   }*/

  updateStatus(data: MesTrajInterface) {
    data.status = 'pas encore pris en charge';
    this.mesTrajService.updateStatus(data);
    console.log(data);
  }
}

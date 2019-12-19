import { Component, Input, OnInit } from '@angular/core';
import {DispListTraj} from '../../adminFolder/admin-list-traj/admin-list-traj.interface';
import {MesTournService} from '../../services/mestourn.service';
import {PaypalInterface} from '../../paypal/paypal.interface';
import {PaypalService} from '../../services/paypal.service';

@Component({
  selector: 'app-mes-tourn',
  templateUrl: './mes-tourn.component.html',
  styleUrls: ['./mes-tourn.component.css', '../../app.component.css']
})
export class MesTournComponent implements OnInit {

  mesTournInfos: DispListTraj = {
    idUser: null,
    depart: '',
    arrivee: '',
    nbrePlaces: null
  };
  error: string;
  paypalInterface: PaypalInterface = {
    idUser: 1,
    idTournee: 1,
    prix: ''
  };
  constructor(private paypalService: PaypalService, private mesTournService: MesTournService) {
  }

  ngOnInit() {
    this.mesTournService.dispTourn(this.mesTournInfos)
      .then((dataTraj: DispListTraj) => {
        this.mesTournInfos.idUser = dataTraj.idUser;
        this.mesTournInfos.depart = dataTraj.depart;
        this.mesTournInfos.arrivee = dataTraj.arrivee;
        this.mesTournInfos.nbrePlaces = dataTraj.nbrePlaces;
        console.log(this.mesTournInfos);
      })
      .catch(() => {
        console.log('Error');
      });
    this.paypalService.getPricePaypal(this.paypalInterface)
      .then((paypalInterface: PaypalInterface) => {
        this.paypalInterface.prix = paypalInterface.prix;
      })
      .catch(() => {
        console.log('Error');
      });
    }
}

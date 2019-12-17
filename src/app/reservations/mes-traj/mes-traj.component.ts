import { Component, OnInit } from '@angular/core';
import {PaypalInterface} from '../../paypal/paypal.interface';
import {PaypalService} from '../../services/paypal.service';

@Component({
  selector: 'app-mes-traj',
  templateUrl: './mes-traj.component.html',
  styleUrls: ['./mes-traj.component.css','../../app.component.css']
})
export class MesTrajComponent implements OnInit {
  paypalInterface: PaypalInterface = {
    idUser: 1,
    idTournee: 1,
    prix: ''
  };
  constructor(private paypalService: PaypalService) { }

  ngOnInit() {
    this.paypalService.getPricePaypal(this.paypalInterface)
      .then((paypalInterface: PaypalInterface) => {
        this.paypalInterface.prix = paypalInterface.prix;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

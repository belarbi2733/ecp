import { Component, OnInit } from '@angular/core';
import {PaypalInterface} from '../../paypal/paypal.interface';
import {PaypalService} from '../../services/paypal.service';

@Component({
  selector: 'app-mes-colis',
  templateUrl: './mes-colis.component.html',
  styleUrls: ['./mes-colis.component.css']
})
export class MesColisComponent implements OnInit {
  paypalInterface: PaypalInterface = {
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

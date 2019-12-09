import { Component, OnInit } from '@angular/core';
import {PaypalInterface} from '../../paypal/paypal.interface';
import {PaypalService} from '../../services/paypal.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css',  '../../app.component.css']
})
export class PaymentsComponent implements OnInit {

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

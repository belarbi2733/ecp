import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { PaypalInterface } from './paypal.interface';
import { PaypalService } from '../services/paypal.service';


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css', '../app.component.css']
})
 export class PaypalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  paypalInterface: PaypalInterface = {
    idUser: 1,
    idTournee: 1,
    prix: ''
  };

  constructor(private paypalService: PaypalService) {
  }

   ngOnInit() {
    this.paypalService.getPricePaypal(this.paypalInterface)
       .then((paypalInterface: PaypalInterface) => {
         this.paypalInterface.prix = paypalInterface.prix;
       })
       .catch(() => {
         console.log('Error');
       });

    this.initConfig();
   }

   private initConfig(): void {
     this.payPalConfig = {
     currency: 'EUR',
     clientId: 'AXHTZO11HV_dLhnyDxxlsRiYHWaWFIB4HL9gmHHavzx13IPXvQNSiJWcNCRQQESic_-H-CLOFc0NW0Qq',
     createOrderOnClient: (data) => <ICreateOrderRequest> {
       intent: 'CAPTURE',
       purchase_units: [
         {
           amount: {
             currency_code: 'EUR',
             value: this.paypalInterface.prix,
             breakdown: {
               item_total: {
                 currency_code: 'EUR',
                 value: this.paypalInterface.prix
               }
             }
           },
           items: [
             {
               name: 'Payment',
               quantity: '1',
               category: 'DIGITAL_GOODS',
               unit_amount: {
                 currency_code: 'EUR',
                 value: this.paypalInterface.prix,
               },
             }
           ]
         }
       ]
     },
     advanced: {
       commit: 'true'
     },
     style: {
       label: 'paypal',
       layout: 'vertical'
     },
     onApprove: (data, actions) => {
       console.log('onApprove - transaction was approved, but not authorized', data, actions);
       actions.order.get().then(details => {
         console.log('onApprove - you can get full order details inside onApprove: ', details);
       });
     },
     onClientAuthorization: (data) => {
       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
       //Ajouter le status "Payé par le passager"
       this.paypalService.statusPayPass(this.paypalInterface);
     },
     onCancel: (data, actions) => {
       console.log('OnCancel', data, actions);
     },
     onError: err => {
       console.log('OnError', err);
     },
     onClick: (data, actions) => {
       console.log('onClick', data, actions);
     },
   };
   }
 }

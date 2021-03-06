import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { PaypalInterface } from './paypal.interface';
import { PaypalService } from '../services/paypal.service';
import {MesTrajInterface} from '../reservations/mes-traj/mes-traj.interface';


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css', '../app.component.css']
})
 export class PaypalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  paypalInterface: PaypalInterface = {
    prix: ''
  };

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

  constructor(private paypalService: PaypalService) {
    this.mesTrajInterface.idUser = JSON.parse(localStorage.getItem('idUser')).id;
  }

  ngOnInit() {
    this.paypalService.getMyTraj(this.mesTrajInterface)
      .then((mesTrajInterface: MesTrajInterface) => {
        this.mesTrajInterface = mesTrajInterface;
        this.paypalInterface.prix = this.mesTrajInterface.prix.toString();
      })
      .catch(() => {
        console.log('Error in paypalComponent');
      });




    /*this.paypalService.getPricePaypal(this.paypalInterface)
       .then((prix: number) => {
         this.paypalInterface.prix = prix.toString();
       })
       .catch(() => {
         console.log('Error');
       });*/
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
       // Ajouter le status "Payé par le passager"
       this.paypalService.statusPayPass(this.mesTrajInterface);
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

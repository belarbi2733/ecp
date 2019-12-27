import { Component, OnInit } from '@angular/core';
import {PaypalInterface} from '../../paypal/paypal.interface';
import {PaypalService} from '../../services/paypal.service';
import {MesColisInterface} from './mes-colis.interface';
import {MesColisService} from '../../services/profileServices/mes-colis.service';

@Component({
  selector: 'app-mes-colis',
  templateUrl: './mes-colis.component.html',
  styleUrls: ['./mes-colis.component.css', '../../app.component.css']
})
export class MesColisComponent implements OnInit {

 mesColisInterface: MesColisInterface = {
   id: null,
   idUser: null,
  nomColis: '',
  poids: null,
  volume: null,
  descr: '',
   prix: ''
 };


  constructor(private mesColisService: MesColisService) {
    this.mesColisInterface.idUser = JSON.parse(localStorage.getItem('idUser')).id;
  }

  ngOnInit() {
    this.mesColisService.getAllColis(this. mesColisInterface)
      .then(( mesColisInterface: MesColisInterface) => {
        this.mesColisInterface = mesColisInterface;
      })
      .catch(() => {
        console.log('Error in Angular mes-colisComponents');
      });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { VehicleService } from '../../services/profileServices/vehicle.service';
import {DataVehicle} from './vehicle.interface';
import {DataPersonal} from '../personal-data/personal-data.interface';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css', '../../app.component.css']
})
export class VehicleComponent implements OnInit {

  vehicule: DataVehicle = {
    idUser: null,
    marque: '',
    modele: '',
    sieges: 1,
    volumeCoffre: null,
  };

  constructor(private vehiculeService: VehicleService) {
    this.vehicule.idUser = JSON.parse(localStorage.getItem('idUser')).id;
  }

  ngOnInit() {
    this.vehiculeService.getVehicleDataById(this.vehicule)
      .then((dataUser: DataVehicle) => {
        /*this.vehicule.marque = dataUser.marque;
        this.vehicule.modele = dataUser.modele;
        this.vehicule.sieges = dataUser.sieges;
        this.vehicule.volumeCoffre = dataUser.volumeCoffre;*/
        if (dataUser !== null) {
          this.vehicule = dataUser;
          console.log(this.vehicule);
        }
      })
      .catch( () => {
        console.log('Error in getUserDataById');
      });
  }

  updateVehicule(data: DataVehicle) {
    this.vehiculeService.modifVehicule(data);
  }

}

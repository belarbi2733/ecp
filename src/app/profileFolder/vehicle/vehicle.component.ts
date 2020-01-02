import { Component, Input, OnInit } from '@angular/core';
import { VehicleService } from '../../services/profileServices/vehicle.service';
import {DataVehicle} from './vehicle.interface';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css', '../../app.component.css']
})
export class VehicleComponent implements OnInit {

  msg = '';

  vehicule: DataVehicle = {
    idUser: null,
    marque: '',
    modele: '',
    volumeCoffre: null,
  };

  constructor(private vehiculeService: VehicleService) {
    this.vehicule.idUser = JSON.parse(localStorage.getItem('idUser')).id;
  }

  ngOnInit() {
    this.vehiculeService.getVehicleDataById(this.vehicule)
      .then((dataUser: DataVehicle) => {
        if (dataUser !== null) {
          this.vehicule.marque = dataUser.marque;
          this.vehicule.modele = dataUser.modele;
          this.vehicule.volumeCoffre = dataUser.volumeCoffre;
          console.log(this.vehicule);
        }
      })
      .catch( () => {
        console.log('Error in getUserDataById');
        this.msg = 'Erreur avec la database';
      });
  }

  updateVehicule(data: DataVehicle) {
    this.msg = '';
    if (data.marque === '' || data.modele === '' || data.volumeCoffre === null) {
      this.msg = 'Certains champs ne sont pas complétés !';
    } else {
      console.log('Update voiture');
      this.vehiculeService.modifVehicule(data);
      this.msg = 'La voiture a bien été enregistrée';
    }
  }
}

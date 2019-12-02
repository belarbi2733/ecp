import { Component, Input, OnInit } from '@angular/core';
import { VehicleService } from '../../services/profileServices/vehicle.service';
import {DataVehicle} from './vehicle.interface';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css', '../../app.component.css']
})
export class VehicleComponent implements OnInit {

  vehicule: DataVehicle = {
    marque: '',
    modele: '',
    sieges: 1,
    volumeCoffre: null,
  };

  constructor(private vehiculeService: VehicleService) { }

  ngOnInit() {
  }

  updateVehicule() {

  }

}

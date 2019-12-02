import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataVehicle} from '../../profileFolder/vehicle/vehicle.interface';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8080';

  modifVehicule(data: DataVehicle) {

  }

  // getVehicleDataById
}

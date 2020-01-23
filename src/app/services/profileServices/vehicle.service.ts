import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataVehicle} from '../../profileFolder/vehicle/vehicle.interface';
import {ServerconfigService} from '../../serverconfig.service';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient, private servUrl: ServerconfigService) { }
  url = this.servUrl.nodeUrl;

  modifVehicule(data: DataVehicle) {
    this.http.post(`${this.url}/vehicule/update`, data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured:' , err);
        }
      );
  }

  getVehicleDataById(data: DataVehicle) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/vehicule/getDataByIdUser`, data)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log('Error occured:', err);
            reject();
          }
        );
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AdminInterface } from './admin.interface';
import { AdminService } from '../../services/adminServices/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css','../../app.component.css']
})
export class AdminComponent implements OnInit {

adminInterface: AdminInterface = {
  nbreUsersStat: 0,
  nbreColisStat: 0,
  nbreTrajStat: 0,
  nbreTournStat: 0,
  nbreCondStat: 0,
  nbreColisLivrStat: 0,
  nbreTrajEffecStat: 0,
  nbreTournEffecStat: 0,
  date: new Date(Date.now())
};


  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getNbreUsers(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreUsersStat = adminInterface.nbreUsersStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.adminService.getNbreColis(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreColisStat = adminInterface.nbreColisStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.adminService.getNbreTraj(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreTrajStat = adminInterface.nbreTrajStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.adminService.getNbreTourn(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreTournStat = adminInterface.nbreTournStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.adminService.getNbreCond(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreCondStat = adminInterface.nbreCondStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.adminService.getNbreColisLivr(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreColisLivrStat = adminInterface.nbreColisLivrStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.adminService.getNbreTrajEffec(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreTrajEffecStat = adminInterface.nbreTrajEffecStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.adminService.getNbreTournEffec(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreTournEffecStat = adminInterface.nbreTournEffecStat;
      })
      .catch(() => {
        console.log('Error');
      });
  }

  enregistrer(){
    this.adminService.enregStat(this.adminInterface);
  }

}

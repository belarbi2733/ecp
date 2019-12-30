import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AdminInterface } from './admin.interface';
import { UserStatService } from '../../services/adminServices/userstat.service';

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
  nbreTournEffecStat: 0
};


  constructor(private userStatService: UserStatService) { }

  ngOnInit(): void {
    this.userStatService.getNbreUsers(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreUsersStat = adminInterface.nbreUsersStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.userStatService.getNbreColis(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreColisStat = adminInterface.nbreColisStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.userStatService.getNbreTraj(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreTrajStat = adminInterface.nbreTrajStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.userStatService.getNbreTourn(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreTournStat = adminInterface.nbreTournStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.userStatService.getNbreCond(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreCondStat = adminInterface.nbreCondStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.userStatService.getNbreColisLivr(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreColisLivrStat = adminInterface.nbreColisLivrStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.userStatService.getNbreTrajEffec(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreTrajEffecStat = adminInterface.nbreTrajEffecStat;
      })
      .catch(() => {
        console.log('Error');
      });

    this.userStatService.getNbreTournEffec(this.adminInterface)
      .then((adminInterface: AdminInterface) => {
        this.adminInterface.nbreTournEffecStat = adminInterface.nbreTournEffecStat;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

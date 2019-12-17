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
    nbreUsersStat: 0
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
  }

}

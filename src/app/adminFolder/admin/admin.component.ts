import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {UserStatService} from '../../services/adminServices/userstat.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  nbreUsersStat = null;

  constructor(private userStatService: UserStatService) { }

  ngOnInit() {
    console.log(this.userStatService.getNbreUsers());
    this.nbreUsersStat = this.userStatService.getNbreUsers();
  }

}

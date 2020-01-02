import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserStatService } from '../../services/adminServices/userstat.service';
import { UserStatInterface } from './userstat.interface';


@Component({
  selector: 'app-userstat',
  templateUrl: './userstat.component.html',
  styleUrls: ['./userstat.component.css','../../app.component.css']
})
export class UserstatComponent implements OnInit {

  userStatInterface: UserStatInterface = {
    dataUser: [],
    chartLabels: []
  };

  public graphData = {
    data : [],
    label : 'Nombre d utilisateurs'
  };
  public lineChartData: ChartDataSets[] = [
    this.graphData
  ];
  public lineChartLabels: Label [] = [];

  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private userStatService: UserStatService) { }

  ngOnInit(): void {
    this.userStatService.getNbreUsersTab(this.userStatInterface)
      .then((userStatInterface: UserStatInterface) => {
        console.log(userStatInterface.dataUser + userStatInterface.chartLabels);
        this.graphData.data = userStatInterface.dataUser;
        this.lineChartLabels = userStatInterface.chartLabels;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

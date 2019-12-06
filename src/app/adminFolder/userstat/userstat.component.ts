import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-userstat',
  templateUrl: './userstat.component.html',
  styleUrls: ['./userstat.component.css']
})
export class UserstatComponent implements OnInit {
  public graphData = {
    data : [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
    label : 'Nombre d utilisateurs'
  };
  public lineChartData: ChartDataSets[] = [
    this.graphData
  ];
  public lineChartLabels: Label [] = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

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

  constructor() { }

  ngOnInit() {
  }

}

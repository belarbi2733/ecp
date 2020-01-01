import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CondStatService } from '../../services/adminServices/condstat.service';
import { CondStatInterface } from './condstat.interface';


@Component({
  selector: 'app-condstat',
  templateUrl: './condstat.component.html',
  styleUrls: ['./condstat.component.css']
})
export class CondstatComponent implements OnInit {

  condStatInterface: CondStatInterface = {
    dataCond: [],
    chartLabels: []
  };

  public graphData = {
    data : [],
    label : 'Nombre de conducteurs'
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

  constructor(private condStatService: CondStatService) { }

  ngOnInit() {
    this.condStatService.getNbreCondTab(this.condStatInterface)
      .then((condStatInterface: CondStatInterface) => {
        console.log(condStatInterface.dataCond + condStatInterface.chartLabels);
        this.graphData.data = condStatInterface.dataCond;
        this.lineChartLabels = condStatInterface.chartLabels;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

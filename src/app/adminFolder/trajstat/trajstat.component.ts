import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TrajStatService } from '../../services/adminServices/trajstat.service';
import { TrajStatInterface } from './trajstat.interface';


@Component({
  selector: 'app-trajstat',
  templateUrl: './trajstat.component.html',
  styleUrls: ['./trajstat.component.css']
})
export class TrajstatComponent implements OnInit {

  trajStatInterface: TrajStatInterface = {
    dataTraj: [],
    chartLabels: []
  };

  public graphData = {
    data : [],
    label : 'Nombre de trajets'
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

  constructor(private trajStatService: TrajStatService) { }

  ngOnInit() {
    this.trajStatService.getNbreTrajTab(this.trajStatInterface)
      .then((trajStatInterface: TrajStatInterface) => {
        console.log(trajStatInterface.dataTraj + trajStatInterface.chartLabels);
        this.graphData.data = trajStatInterface.dataTraj;
        this.lineChartLabels = trajStatInterface.chartLabels;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

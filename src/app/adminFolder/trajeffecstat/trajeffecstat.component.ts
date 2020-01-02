import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TrajEffecStatService } from '../../services/adminServices/trajeffecstat.service';
import { TrajEffecStatInterface } from './trajeffecstat.interface';


@Component({
  selector: 'app-trajeffecstat',
  templateUrl: './trajeffecstat.component.html',
  styleUrls: ['./trajeffecstat.component.css']
})
export class TrajeffecstatComponent implements OnInit {

  trajeffecStatInterface: TrajEffecStatInterface = {
    dataTrajEffec: [],
    chartLabels: []
  };

  public graphData = {
    data : [],
    label : 'Nombre de trajets effectués'
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

  constructor(private trajeffecStatService: TrajEffecStatService) { }

  ngOnInit() {
    this.trajeffecStatService.getNbreTrajEffecTab(this.trajeffecStatInterface)
      .then((trajeffecStatInterface: TrajEffecStatInterface) => {
        console.log(trajeffecStatInterface.dataTrajEffec + trajeffecStatInterface.chartLabels);
        this.graphData.data = trajeffecStatInterface.dataTrajEffec;
        this.lineChartLabels = trajeffecStatInterface.chartLabels;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

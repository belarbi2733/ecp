import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TournEffecStatService } from '../../services/adminServices/tourneffecstat.service';
import { TournEffecStatInterface } from './tourneffecstat.interface';


@Component({
  selector: 'app-tourneffecstat',
  templateUrl: './tourneffecstat.component.html',
  styleUrls: ['./tourneffecstat.component.css']
})
export class TourneffecstatComponent implements OnInit {

  tourneffecStatInterface: TournEffecStatInterface = {
    dataTournEffec: [],
    chartLabels: []
  };

  public graphData = {
    data : [],
    label : 'Nombre de tournées effectuées'
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

  constructor(private tourneffecStatService: TournEffecStatService) { }

  ngOnInit(): void {
    this.tourneffecStatService.getNbreTournEffecTab(this.tourneffecStatInterface)
      .then((tourneffecStatInterface: TournEffecStatInterface) => {
        console.log(tourneffecStatInterface.dataTournEffec + tourneffecStatInterface.chartLabels);
        this.graphData.data = tourneffecStatInterface.dataTournEffec;
        this.lineChartLabels = tourneffecStatInterface.chartLabels;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

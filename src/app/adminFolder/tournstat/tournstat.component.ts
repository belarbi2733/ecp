import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TournStatService } from '../../services/adminServices/tournstat.service';
import { TournStatInterface } from './tournstat.interface';


@Component({
  selector: 'app-tournstat',
  templateUrl: './tournstat.component.html',
  styleUrls: ['./tournstat.component.css']
})
export class TournstatComponent implements OnInit {

  tournStatInterface: TournStatInterface = {
    dataTourn: [],
    chartLabels: []
  };

  public graphData = {
    data : [],
    label : 'Nombre de tournées'
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

  constructor(private tournStatService: TournStatService) { }

  ngOnInit(): void {
    this.tournStatService.getNbreTournTab(this.tournStatInterface)
      .then((tournStatInterface: TournStatInterface) => {
        console.log(tournStatInterface.dataTourn + tournStatInterface.chartLabels);
        this.graphData.data = tournStatInterface.dataTourn;
        this.lineChartLabels = tournStatInterface.chartLabels;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

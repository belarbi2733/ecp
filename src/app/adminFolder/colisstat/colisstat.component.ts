import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ColisStatService } from '../../services/adminServices/colisstat.service';
import { ColisStatInterface } from './colisstat.interface';


@Component({
  selector: 'app-colisstat',
  templateUrl: './colisstat.component.html',
  styleUrls: ['./colisstat.component.css']
})
export class ColisstatComponent implements OnInit {

  colisStatInterface: ColisStatInterface = {
    dataColis: [],
    chartLabels: []
  };

  public graphData = {
    data : [],
    label : 'Nombre de colis'
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

  constructor(private colisStatService: ColisStatService) { }

  ngOnInit() {
    this.colisStatService.getNbreColisTab(this.colisStatInterface)
      .then((colisStatInterface: ColisStatInterface) => {
        console.log(colisStatInterface.dataColis + colisStatInterface.chartLabels);
        this.graphData.data = colisStatInterface.dataColis;
        this.lineChartLabels = colisStatInterface.chartLabels;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ColisLivrStatService } from '../../services/adminServices/colislivrstat.service';
import { ColisLivrStatInterface } from './colislivrstat.interface';


@Component({
  selector: 'app-colislivrstat',
  templateUrl: './colislivrstat.component.html',
  styleUrls: ['./colislivrstat.component.css']
})
export class ColislivrstatComponent implements OnInit {

  colislivrStatInterface: ColisLivrStatInterface = {
    dataColisLivr: [],
    chartLabels: []
  };

  public graphData = {
    data : [],
    label : 'Nombre de colis livrés'
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

  constructor(private colislivrStatService: ColisLivrStatService) { }

  ngOnInit(): void {
    this.colislivrStatService.getNbreColisLivrTab(this.colislivrStatInterface)
      .then((colislivrStatInterface: ColisLivrStatInterface) => {
        console.log(colislivrStatInterface.dataColisLivr + colislivrStatInterface.chartLabels);
        this.graphData.data = colislivrStatInterface.dataColisLivr;
        this.lineChartLabels = colislivrStatInterface.chartLabels;
      })
      .catch(() => {
        console.log('Error');
      });
  }

}

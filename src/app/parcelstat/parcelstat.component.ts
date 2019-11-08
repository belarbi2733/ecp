import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-parcelstat',
  templateUrl: './parcelstat.component.html',
  styleUrls: ['./parcelstat.component.css']
})
export class ParcelstatComponent implements OnInit {
  public lastParcel = [
    {
    name: "BPost",
    sender: "Admin",
    reciever: "user"
    },
    {
      name: "BPost",
      sender: "Admin",
      reciever: "user"
    },
    {
      name: "BPost",
      sender: "Admin",
      reciever: "user"
    },
    {
      name: "BPost",
      sender: "Admin",
      reciever: "user"
    }
  ];
  public lineChartData: ChartDataSets[]= [
    {
      data : [65, 59, 80, 81, 56, 55, 40],
      label : 'Nombre de trajets'
    }
  ];
  public lineChartLabels : Label [] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions:(ChartOptions) = {
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

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css','../../app.component.css']
})
export class VehicleComponent implements OnInit {

  @Input() carMarque: string = "MARQUE";
  @Input() carModele: string = "MODELE";
  @Input() carSieges: number = 4;
  @Input() carVolume: number = 20;

  constructor() { }

  ngOnInit() {
  }

  modifierInfo(){

  }

}

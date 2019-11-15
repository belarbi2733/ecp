import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-rembours',
  templateUrl: './admin-rembours.component.html',
  styleUrls: ['./admin-rembours.component.css']
})
export class AdminRemboursComponent implements OnInit {

  trajetStatus: boolean;

  constructor() {
    this.trajetStatus = false;
  }

  ngOnInit() {
  }

  rembours(){

  }

  payer(){

  }

}

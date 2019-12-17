import {parcour} from './../map/tourne.json';
 

  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  
  var tour;
  @Injectable()
  export class TrajetService {
    trajetUrl = '../../../../backend/tournee.json';
    
    constructor(private http: HttpClient) { };
    getConfig() {
      return this.http.get(this.trajetUrl);
    }
    ngOnInit() {
    tour = this.getConfig()
    console.log(JSON.stringify(tour));
  
  }
  }


  
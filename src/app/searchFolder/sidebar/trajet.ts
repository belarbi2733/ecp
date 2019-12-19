import {parcour} from './../map/tourne.json';
 

  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { HttpClientModule } from '@angular/common/http';
  
  var tour;
  @Injectable()
  export class TrajetService {
    trajetUrl = '../../../../backend/tournee.json';
    
    constructor(private http: HttpClient, private https : HttpClientModule) { };
    getConfig() {
      return this.http.get(this.trajetUrl)
    }
  }


  
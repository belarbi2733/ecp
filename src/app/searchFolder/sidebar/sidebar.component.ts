import { Component, Input, OnInit } from '@angular/core';
import { TrajetService } from './trajet';
import {alternative} from './alternative'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
var tour ;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  alternative = alternative ;
  products: any = [];
  constructor(private trajetserver : TrajetService) {  }
  
  ngOnInit() {
    tour = this.trajetserver.getConfig();
    console.log(JSON.stringify(tour));
    
    //console.log(JSON.parse(tour.getItem('parcour')));
  }

}

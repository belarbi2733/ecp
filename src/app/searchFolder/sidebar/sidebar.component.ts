import { Component, Input, OnInit } from '@angular/core';
import { alternative } from './alternative';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  alternative=alternative;

  constructor() { }

  ngOnInit() {
  }

}

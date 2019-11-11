import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.css','../../app.component.css']
})
export class TrajetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toAddTrajet(){
    this.router.navigate(['add-trajet']);
  }

}

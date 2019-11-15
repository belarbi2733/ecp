import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trajet',
  templateUrl: './add-trajet.component.html',
  styleUrls: ['./add-trajet.component.css','../../app.component.css']
})
export class AddTrajetComponent implements OnInit {

  @Input() trajDepart: string;
  @Input() trajDestination: string;
  @Input() trajDate: Date;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addTraj(){
    this.router.navigate(['accueil']);
  }

}

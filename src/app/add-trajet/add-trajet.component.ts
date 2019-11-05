import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trajet',
  templateUrl: './add-trajet.component.html',
  styleUrls: ['./add-trajet.component.css']
})
export class AddTrajetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addTraj(){
    this.router.navigate(['accueil']);
  }
  
  toAccueil(){
    this.router.navigate(['accueil']);
  }

}

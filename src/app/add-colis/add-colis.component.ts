import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-colis',
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.css']
})
export class AddColisComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addCol(){
    this.router.navigate(['accueil']);
  }

  toAccueil(){
    this.router.navigate(['accueil']);
  }

}

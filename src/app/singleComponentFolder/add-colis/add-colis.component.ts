import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-colis',
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.css','../../app.component.css']
})
export class AddColisComponent implements OnInit {

  @Input() colisNom: string;
  @Input() colisDepart: string;
  @Input() colisDestination: string;
  @Input() colisDate: Date;
  @Input() colisPoids: number;
  @Input() colisVolume: number;
  @Input() colisDescription: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addCol(){
    this.router.navigate(['accueil']);
  }

}

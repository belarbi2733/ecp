import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css','../../app.component.css']
})
export class PersonalDataComponent implements OnInit {

  @Input() userNom: string = "NOM";
  @Input() userPrenom: string = "PRENOM";
  @Input() userSexe: string = "homme";
  @Input() userMail: string = "MAIL";
  @Input() userTel: string = "0492456789";
  @Input() userDate: Date;

  constructor() { }

  ngOnInit() {
  }

  modifierInfo() {

  }

}

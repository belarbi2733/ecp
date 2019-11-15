import { Component, Input, OnInit } from '@angular/core';
import { alternative } from './alternative';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() userNom: string = "NOM";
  @Input() userPrenom: string = "PRENOM";
  @Input() userSexe: string = "homme";
  @Input() userMail: string = "MAIL";
  @Input() userTel: string = "0492456789";
  @Input() userDate: Date;

  alternative=alternative;
  
  constructor() { }

  ngOnInit() {
  }

}

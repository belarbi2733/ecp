import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css','../../app.component.css']
})
export class PreferencesComponent implements OnInit {

  @Input() prefAnimal: string = "2";
  @Input() prefFumer: string = "true";

  constructor() { }

  ngOnInit() {
  }

}

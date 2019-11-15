import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  currentRate: number = 3;
  commentaire: string = "Super passager";

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colis',
  templateUrl: './colis.component.html',
  styleUrls: ['./colis.component.css','../../app.component.css']
})
export class ColisComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toAddColis(){
    this.router.navigate(['add-colis']);
  }

}

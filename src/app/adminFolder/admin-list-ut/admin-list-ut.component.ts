import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list-ut',
  templateUrl: './admin-list-ut.component.html',
  styleUrls: ['./admin-list-ut.component.css']
})
export class AdminListUtComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  suspendre(){
    this.router.navigate(['admin-list-ut']);
  }

}

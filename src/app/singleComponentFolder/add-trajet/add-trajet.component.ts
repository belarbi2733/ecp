import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Addtrajet } from './add-trajet.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-add-trajet',
  templateUrl: './add-trajet.component.html',
  styleUrls: ['./add-trajet.component.css','../../app.component.css']
})


  @Injectable()
  export class AddTrajetComponent implements OnInit {
    addtrajet: Addtrajet  = {
      id_utilisateur: null,
      depart: '',
      destination: '',
      date: ''
    };



  dataNode: Addtrajet[];
  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.http
        .get(`http://localhost:8080/`)
        .subscribe((data: Addtrajet[]) => {
          this.dataNode = data;
          console.log(data);
        });
  }

  addTraj(data: Addtrajet){
    this.router.navigate(['accueil']);
    console.log('Départ' + data.depart );
    console.log('Destination' + data.destination );
    console.log('Date' + data.date );
    this.http.post(`http://localhost:8080/`, data)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured:' , err);
      }
    );


  }

}

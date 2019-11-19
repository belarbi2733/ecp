import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Inscription} from './inscr.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-inscr',
  templateUrl: './inscr.component.html',
  styleUrls: ['./inscr.component.css' , '../../app.component.css']
})

@Injectable()
export class InscrComponent implements OnInit {
  inscription: Inscription = {
    id_utilisateur: null,
    adresse_mail: '',
    mot_passe: '',
    verification_mot_passe: ''
  };

  dataNode: Inscription[];
  constructor(private router: Router, private http: HttpClient) {
  }
  ngOnInit() {
    this.http
        .get(`http://localhost:8080/`)
        .subscribe((data: Inscription[]) => {
          this.dataNode = data;
          console.log(data);
        });
  }

  inscrire(data: Inscription) {
    this.router.navigate(['accueil']);
    console.log('adresse mail: ' + data.adresse_mail);
    console.log('mot de passe: ' + data.mot_passe);

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

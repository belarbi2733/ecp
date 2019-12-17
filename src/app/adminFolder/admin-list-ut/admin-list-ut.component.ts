import { Component, OnInit } from '@angular/core';
import {AdminListUtService} from '../../services/admin-list-user.service';
import {AdminListUtInterface} from './admin-list-ut.interface';


@Component({
  selector: 'app-admin-list-ut',
  templateUrl: './admin-list-ut.component.html',
  styleUrls: ['./admin-list-ut.component.css']
})


export class AdminListUtComponent implements OnInit {
  adminListUtInterface: AdminListUtInterface = {
    nom: '',
    prenom: '',
    id: null
  };


constructor(private adminListUtService: AdminListUtService) {
  }

ngOnInit() {
    /*this.adminListUtService.getAllUser(this.adminListUtInterface)
      .then((adminListUtInterface: AdminListUtInterface) => {
        this.adminListUtInterface.nom = adminListUtInterface.nom;
        this.adminListUtInterface.prenom = adminListUtInterface.prenom;
        this.adminListUtInterface.id = adminListUtInterface.id;*/
    this.adminListUtService.getAllUser(this.adminListUtInterface)
      .then((adminListUtInterface: AdminListUtInterface) => {
        this.adminListUtInterface = adminListUtInterface;
       /* console.log(JSON.stringify(this.adminListUtInterface));*/
        // tslint:disable-next-line:forin
      /*  for (const i in this.adminListUtInterface) {
          this.arrayut.push([i, this.adminListUtInterface [i]]);
        }
        console.log(this.arrayut);*/
      })
      .catch(() => {
        console.log('Error in getUserDataById');
      });
  }
}

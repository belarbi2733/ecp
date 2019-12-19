import { Component, OnInit } from '@angular/core';
import {AdminListUtService} from '../../services/admin-list-user.service';
import {AdminListUtInterface} from './admin-list-ut.interface';

@Component({
  selector: 'app-admin-list-ut',
  templateUrl: './admin-list-ut.component.html',
  styleUrls: ['./admin-list-ut.component.css','../../app.component.css']
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
    this.adminListUtService.getAllUser(this.adminListUtInterface)
      .then((adminListUtInterface: AdminListUtInterface) => {
        this.adminListUtInterface = adminListUtInterface;
      })
      .catch(() => {
        console.log('Error in getUserDataById');
      });
  }
}

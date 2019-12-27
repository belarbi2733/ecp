import { Component, Input, OnInit } from '@angular/core';
import {MesTournInterface} from '../mes-tourn/mes-tourn.interface';
import {MesTournService} from '../../services/profileServices/mes-tourn.service';

@Component({
  selector: 'app-mes-tourn',
  templateUrl: './mes-tourn.component.html',
  styleUrls: ['./mes-tourn.component.css', '../../app.component.css']
})
export class MesTournComponent implements OnInit {
  mesTournInterface: MesTournInterface = {
    heureDepart: '',
    lieuDepart: '',
    lieuArrivee: '',
    idUser: null,
    status: null
  };
  constructor(private mesTournService: MesTournService) {
    this.mesTournInterface.idUser = JSON.parse(localStorage.getItem('idUser')).id;

  }

  ngOnInit() {
    this.mesTournService.getMyTourn(this.mesTournInterface)
      .then((mesTournInterface: MesTournInterface) => {
        this.mesTournInterface = mesTournInterface;
      })
      .catch(() => {
        console.log('Error in mes-trajComponent');
      });
  }

}

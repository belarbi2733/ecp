import { Component, Input, OnInit } from '@angular/core';
import {DispListTraj} from '../../adminFolder/admin-list-traj/dispadmintraj.interface';
import {MesTournService} from '../../services/mestourn.service';

@Component({
  selector: 'app-mes-tourn',
  templateUrl: './mes-tourn.component.html',
  styleUrls: ['./mes-tourn.component.css']
})
export class MesTournComponent implements OnInit {

  mesTournInfos: DispListTraj = {
    idUser: null,
    depart: '',
    arrivee: '',
    nbrePlaces: null
  };
  error: string;
  constructor(private mesTournService: MesTournService) {
  }

  ngOnInit() {
    this.mesTournService.dispTourn(this.mesTournInfos)
      .then((dataTraj: DispListTraj) => {
        this.mesTournInfos.idUser = dataTraj.idUser;
        this.mesTournInfos.depart = dataTraj.depart;
        this.mesTournInfos.arrivee = dataTraj.arrivee;
        this.mesTournInfos.nbrePlaces = dataTraj.nbrePlaces;
        console.log(this.mesTournInfos);
      })
      .catch(() => {
        console.log('Error');
      });
    }
}

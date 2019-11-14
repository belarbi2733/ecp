import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-info-traj',
  templateUrl: './info-traj.component.html',
  styleUrls: ['./info-traj.component.css']
})
export class InfoTrajComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  seeAdmin(){
    return this.authService.isAdmin;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { TrajetService } from './trajet';
import {alternative} from './alternative'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../validation/confirmation-dialog.service';
var tour ;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../../app.component.css']
})
export class SidebarComponent implements OnInit {

  alternative = alternative ;
  products: any = [];
  constructor(private trajetserver : TrajetService, private router : Router, private confirmationDialogService :ConfirmationDialogService) {  }

  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Confirmation', 'Voulez vous valider cette tournée ?')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  ngOnInit() {
    tour = this.trajetserver.getConfig();
    //console.log(JSON.stringify(tour));
    
    //console.log(JSON.parse(tour.getItem('parcour')));
  }

}

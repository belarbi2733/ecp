import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscr',
  templateUrl: './inscr.component.html',
  styleUrls: ['./inscr.component.css']
})
export class InscrComponent implements OnInit {

  @Input() inscrMail: string;
  @Input() inscrMdp: string;
  @Input() inscrVerifMdp: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  inscrire(){
    this.router.navigate(['accueil']);
  }

}

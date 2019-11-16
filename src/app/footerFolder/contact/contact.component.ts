import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../../app.component.css']
})
export class ContactComponent implements OnInit {

  @Input() contactSujet: string;
  @Input() contactDescription: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  send(){
    this.router.navigate(['accueil']);
  }

}

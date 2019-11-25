import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailingService } from 'src/app/services/mailing.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../../app.component.css']
})
export class ContactComponent implements OnInit {

  @Input() contactSujet: string;
  @Input() contactDescription: string;
  @Input() contactMail: string;
  constructor(private router: Router, private mailServ: MailingService) { }

  ngOnInit() {
  }

  send(){
    // this.router.navigate(['accueil']);
    //Appel à l'API de contact
    // console.log("Voici les envois :" +  this.contactSujet + this.contactMail + this.contactDescription);
    this.mailServ.sendMessage(this.contactSujet, this.contactMail, this.contactDescription).subscribe((response)=>{
      console.log(response);
    });
    // alert('Votre demande a correctement été envoyé à nos service nous reviendrons vers vous sous peu.');
  }

}

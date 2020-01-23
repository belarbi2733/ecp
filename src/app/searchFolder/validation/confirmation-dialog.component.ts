// # Imports
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ValidationService } from '../sidebar/validation.service';
import { Validation } from '../sidebar/validation.interface';

// # Création du component
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})

// # Création de la classe
export class ConfirmationDialogComponent implements OnInit {

  //## On récupère les idtrajets ici
  @Input() title: string;
  @Input() donnee : Validation;
  @Input() message: string;
  @Input() btnOkText: string;

  @Input() btnCancelText: string;

  constructor(private validationservice : ValidationService,private activeModal: NgbActiveModal, private router:Router) { }

  //## ngOnInit
  ngOnInit() {
  }

  // ## Si decline la popup disparait
  public decline() {
    this.activeModal.close(false);
    
  }

  // ## Si accepte on envoie les idtrajets au backend via validationservice.sendmail et on referme la popup
  public accept() {
    this.activeModal.close(true);
    this.validationservice.sendmail(this.donnee);
    console.log (this.donnee);
    window.alert('Votre tournee est en cour de validation ! Un mail va être envoyé aux utilisateurs concernés')
  }

  // ## Si on quite la popup, la popup disparait
  public dismiss() {
    this.activeModal.dismiss();
  }
 }

 
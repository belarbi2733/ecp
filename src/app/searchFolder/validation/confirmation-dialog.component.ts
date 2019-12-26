import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ValidationService } from '../sidebar/validation.service';
import { Validation } from '../sidebar/validation.interface';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: string;
  @Input() donnee : Validation;
  @Input() message: string;
  @Input() btnOkText: string;

  @Input() btnCancelText: string;

  constructor(private validationservice : ValidationService,private activeModal: NgbActiveModal, private router:Router) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
    
  }

  public accept() {
    this.activeModal.close(true);
    this.validationservice.sendmail(this.donnee);
    console.log (this.donnee);
    window.alert('Votre tournee est en cour de validation ! Un mail va être envoyé aux utilisateurs concernés')
    //this.router.navigate(['accueil']);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
 }

 
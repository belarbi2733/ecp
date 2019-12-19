import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;

  @Input() btnCancelText: string;

  constructor(private activeModal: NgbActiveModal, private router:Router) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
    
  }

  public accept() {
    this.activeModal.close(true);
    window.alert('Votre tournee est en cour de validation !')
    this.router.navigate(['accueil']);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
 }

 
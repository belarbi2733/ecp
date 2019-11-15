import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css','../../app.component.css']
})
export class AuthComponent implements OnInit {

  @Input() connectMail: string;
  @Input() connectMdp: string;
  authStatus: boolean;
  adminStatus:boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn(){
    this.authService.signIn().then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.adminStatus = this.authService.isAdmin;
        this.router.navigate(['accueil']);
      }
    );
  }

  onSignInAdmin(){
    this.authService.signInAdmin().then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.adminStatus = this.authService.isAdmin;
        this.router.navigate(['admin']);
      }
    );
  }

  onSignOut(){
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
    this.adminStatus = this.authService.isAdmin;
  }

  toInscr(){
    this.router.navigate(['inscrire']);
  }

}

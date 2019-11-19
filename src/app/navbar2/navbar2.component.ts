import { Component, OnInit, Renderer2, ElementRef, Directive } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {
  private isCollapsed:boolean = true;
  private OpenBtnDisplay = "block";
  private CloseBtnDisplay = "none";
  constructor(private authService: AuthService) {

   }

  ngOnInit() {
  }
  toggleCollapsed(){
    this.isCollapsed = false;
    this.OpenBtnDisplay = "none";
    this.CloseBtnDisplay = "block";
  }
  disToggleCollapsed(){
    this.isCollapsed = true;
    this.CloseBtnDisplay = "none";
    this.OpenBtnDisplay = "block";
  }
  seeAdmin(){
    return this.authService.isAdmin;
  }

}
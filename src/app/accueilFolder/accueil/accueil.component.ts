import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    if (localStorage.length === 0) { // Si le localStorage est vide, le remplir avec les valeurs par défaut
      console.log('Défaut');
      const isAuthJson = {isAuth: false};
      localStorage.setItem('isAuth', JSON.stringify(isAuthJson)); // Stockage de is Auth par défaut dans localstorage

      const isAdminJson = {isAdmin: false};
      localStorage.setItem('isAdmin', JSON.stringify(isAdminJson)); // Stockage de is Admin par défaut dans localstorage

      const idJson = {id: -1};
      localStorage.setItem('idUser', JSON.stringify(idJson)); // Stockage de idUser par défaut dans localstorage
    }
    // console.log(localStorage);
  }

}

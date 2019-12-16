import { Component, OnInit } from '@angular/core';
import { RatingInterface } from './rating.interface';
import { RatingService } from '../../services/profileServices/rating.service';
import {PaypalInterface} from '../../paypal/paypal.interface';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  rating: RatingInterface = {
    idUser: null,
    currentRate: null,
    commentaires: ['Coucou', 'C est moi', 'Attention les commentaires ne sont pas fonctionnels ! '],
  };


  constructor(private ratingService: RatingService) {
    this.rating.idUser = JSON.parse(localStorage.getItem('idUser')).id; // Loading idUser from localStorage
     }

  ngOnInit() {
    this.ratingService.getRatingById(this.rating)
      .then((dataUser: number) => {
        this.rating.currentRate = dataUser;
      })
      .catch( () => {
        console.log('Error in getRatingById');
      });
  }
}

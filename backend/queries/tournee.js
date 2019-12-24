let db = require("../db.js");

let Tournee = {

  createTournee: function(idVoiture, search, distance, callback){
    distance *= 1000; //Conversion km -> m
    distance = distance.toFixed(0);
    return db.query('INSERT INTO tournee (id_voiture, statut, depart_adresse, arrivee_adresse, depart_x, depart_y, arrivee_x, arrivee_y, distance, heure_depart) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id',
      [idVoiture,0, search.departureAddress, search.arrivalAddress, search.departure[0],search.departure[1],search.arrival[0],search.arrival[1],distance,search.departuretime],
      callback);
  },

  /*getDataTournee: function(x, callback)
  {
    console.log("Id : " + x);
   // return db.query('SELECT * FROM trajet WHERE id= $1', [x],callback);
  }*/

};

module.exports = Tournee;

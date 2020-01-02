let db = require("../db.js");

let Tournee = {

  createTournee: function(idUser, idVoiture, search, distance, callback){
    console.log('dist : ' + distance);
    distance *= 1000; //Conversion km -> m
    distance = distance.toFixed(0);
    return db.query('INSERT INTO tournee (id_user, id_voiture, statut, depart_adresse, arrivee_adresse, depart_x, depart_y, arrivee_x, arrivee_y, distance, heure_depart) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id',
      [idUser, idVoiture, 0, search.departureAddress, search.arrivalAddress, search.departure[0],search.departure[1],search.arrival[0],search.arrival[1],distance,search.departuretime],
      callback);
  },


  getAllTourn: function(callback)
  {
    console.log("Get All Tournees");
    return db.query('SELECT * FROM tournee', callback);
  },


  getAllTournEffec: function(callback)
  {
    console.log("Get All Tournées effectuées");
    return db.query('SELECT * FROM tournee WHERE statut = $1', [1], callback);
  },


  getDataTournByIdUser: function(id, callback)
  {
    console.log('getDataTournByIdUSer : ' + id );
    return db.query('SELECT * FROM tournee WHERE id_user = $1', [id], callback);
  },
};

module.exports = Tournee;

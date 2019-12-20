let db = require("./db.js");

let Tournee = {

  createTournee: function(idVoiture, search, callback){
    return db.query('INSERT INTO tournee (id_voiture, statut, depart_x, depart_y, arrivee_x, arrivee_y, duree, distance, heure_depart)',
      [idVoiture,0,search.departure[0],search.departure[1],search.arrival[0],search.arrival[1],search.time,search.distance,search.departuretime],
      callback);
  },

  getDataTournee: function(x, callback)
  {
    console.log("Id : " + x);
   // return db.query('SELECT * FROM trajet WHERE id= $1', [x],callback);
  }

};

module.exports = Tournee;

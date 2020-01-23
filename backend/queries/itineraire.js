let db = require("../db.js");

let Itineraire = {

  addTrajetItineraire: function (idTournee,idTrajet,indice,point,callback) {
    return db.query('INSERT INTO itineraire (id_tournee, id_trajet, indice, point_long, point_lat) VALUES ($1,$2,$3,$4,$5)',
      [idTournee,idTrajet,indice,point[0],point[1]],
      callback);
  }
};


module.exports = Itineraire;

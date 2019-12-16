let db = require("./db.js");

let Colis = {

  addColis: function(colis, callback)
  {
    console.log("Insert colis en cours...");
    return db.query('INSERT INTO colis (id_user,nom,dimension) VALUES ($1, $2, $3)',
      [colis.idUser, colis.nom, colis.volume], callback);
  },

  getIdColisByIdUser: function(colis, callback) {
    console.log("Get IdColis By IdUser and NomColis");
    console.log(colis.idUser,colis.nom);
    return db.query('SELECT id FROM colis WHERE id_user = $1 AND nom = $2 AND dimension = $3',
      [colis.idUser, colis.nom, colis.volume] , callback);
  },

  generateTrajet: function(colis, idColis, callback) {
    console.log("Generate Trajet en cours...");
    return db.query('INSERT INTO trajet (id_user, id_colis, departure_time, distance, depart_address, arrivee_address, depart_x, depart_y, arrivee_x, arrivee_y, statut, book_places) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
      [colis.idUser,idColis,colis.departuretime,colis.distanceinmeters,colis.departureAddress,colis.arrivalAddress,colis.departure[0],colis.departure[1],colis.arrival[0],colis.arrival[1],false,0],
      callback);
  }
};


module.exports = Colis;

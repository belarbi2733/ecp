let db = require("../db.js");

let Colis = {

  addColis: function(colis, callback)
  {
    console.log("Insert colis en cours...");
    return db.query('INSERT INTO colis (id_user,nom_colis,volume) VALUES ($1, $2, $3)',
      [colis.idUser, colis.nom, colis.volume], callback);
  },


  getIdColisByIdUser: function(colis, callback) {
    console.log("Get IdColis By IdUser and NomColis");
    console.log(colis.idUser,colis.nom);
    return db.query('SELECT id FROM colis WHERE id_user = $1 AND nom_colis = $2 AND volume = $3',
      [colis.idUser, colis.nom, colis.volume] , callback);
  },


  generateTrajet: function(colis, prix, idColis, callback) {
    console.log("Generate Trajet en cours...");
    return db.query('INSERT INTO trajet (id_colis, departure_time, distance, prix, depart_address, arrivee_address, depart_x, depart_y, arrivee_x, arrivee_y, statut, book_places) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
      [idColis,colis.departuretime,colis.distanceinmeters, prix, colis.departureAddress,colis.arrivalAddress,colis.departure[0],colis.departure[1],colis.arrival[0],colis.arrival[1],0,0],
      callback);
  },


  getVolumeByIdColis: function(idColis,callback) {
    console.log("Get Volume By : " + idColis);
    return db.query('SELECT volume from colis WHERE id = $1', [idColis], callback);
  },


  getAllColis: function(callback) {
    return db.query('SELECT * from colis', callback);
  },


  getDataColisByIdUser: function(id, callback)
  {
    console.log("getDataColisByIdUser: " + id);
    return db.query('SELECT * FROM colis WHERE id_user = $1', [id], callback);
  },

};


module.exports = Colis;

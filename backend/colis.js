let db = require("./db.js");

let Colis = {

  addColis: function(colis, callback)
  {
    console.log("Insert colis en cours...");
    return db.query('INSERT INTO colis (id_user,nom,dimension) VALUES ($1, $2, $3)',
      [colis.idUser, colis.nom, colis.volume], callback);
  },

  removeColis: function(colis, choixIdColis,  callback)
  {
    return db.query('DELETE FROM colis WHERE colis.id = choixIdColis', callback);
  },

  getColis: function(colis, choixIdColis, callback)
  {
    return db.query('SELECT * FROM colis WHERE colis.id = choixIdColis', callback);
  },

  generateTrajet: function(colis, depart, arrivee, callback) {
    console.log("Generate Trajet en cours...");
    return db.query('INSERT INTO trajet (id_user, id_colis, departure_time, distance, depart_x, depart_y, arrivee_x, arrivee_y, book_places) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [colis.idUser,1,colis.departuretime,colis.distanceinmeters,colis.departance[0],colis.departance[1],colis.arrival[0],colis.arrival[1],0],
      callback);
  }
};


module.exports = Colis;

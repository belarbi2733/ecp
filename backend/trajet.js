let db = require("./db.js");

let Trajet = {

  addTrajet: function(trajet, callback)
  {
    console.log("Insert trajet en cours...");
    db.query('INSERT INTO trajet (id_user, departure_time, distance, depart_x, depart_y, arrivee_x, arrivee_y, book_places) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [trajet.idUser, trajet.departuretime, trajet.distanceinmeters, trajet.departance[0], trajet.departance[1], trajet.arrival[0], trajet.arrival[1], 1], callback);
  },



  // updateTrajet: function(Trajet, callback)
  // {
  //   console.log("Update trajet en cours...");
  //   db.query('UPDATE trajet SET nom = $1,prenom = $2,telephone = $3, sexe = $4, date_naiss = $5, descr = $6',callback);
  // },

  removeTrajet: function(trajet, callback)
  {
    return db.query('DELETE FROM trajet WHERE id_User = trajet.id_User', callback);
  },

  getTrajetById: function(callback)
  {
    console.log("getTrajetById : " + 1);
    return db.query('SELECT * FROM trajet', callback);
  },

  getPrice: function(callback)
  {
    console.log("getPrice : ");
    console.log("test");
    return db.query('SELECT prix FROM trajet ');

  },
  calcPrixTraj: function(callback)
  {
    console.log("Calcul du Prix du trajet");
    // return db.query('SELECT book_places, distance FROM trajet',callback);
    return db.query('SELECT book_places, distance FROM trajet', callback);
  }
};


module.exports = Trajet;

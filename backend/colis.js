let db = require("./db.js");

let Colis = {

  addColis: function(colis, callback)
  {
    console.log("Insert colis en cours...");
    return db.query('INSERT INTO Colis  VALUES (NULL, ?, ?, ?, ?)',
      [colis.id, colis.id_user, colis.poids, colis.dimension, colis.id_trajet], callback);
  },

  removeColis: function(colis, choixIdColis,  callback)
  {
    return db.query('DELETE FROM Colis WHERE colis.id = choixIdColis', callback);
  },

  getColis: function(colis, choixIdColis, callback)
  {
    return db.query('SELECT * FROM Colis WHERE colis.id = choixIdColis', callback);
  },

  generateTrajet: function(colis, depart, arrivee, callback) {
    return db.query('INSERT INTO Trajet (id_user,id_colis,depart,arrivee,nbre_places) VALUES ($1,SELECT id FROM Colis WHERE id = $2,$3,$4,$5)',[colis.id_user,colis.id,depart,arrivee,0],callback);
  }
};


module.exports = Colis;

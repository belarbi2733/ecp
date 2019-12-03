let db = require("./db.js");

let Colis = {

  addColis: function(colis, callback)
  {
    console.log("Insert colis en cours...");
    return db.query('INSERT INTO colis (id_user,nom,descr,poids,dimension) VALUES ($1, $2, $3, $4,$5)',
      [colis.idUser, colis.nom, colis.description, colis.poids, colis.dimension], callback);
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
    return db.query('INSERT INTO trajet (id_user,id_colis,depart,arrivee,book_places) VALUES ($1,$2,$3,$4,$5)',[colis.idUser,1,depart,arrivee,0],callback);
  }
};


module.exports = Colis;

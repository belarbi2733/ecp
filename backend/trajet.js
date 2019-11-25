let db = require("./db.js");

let Trajet = {

  addTrajet: function(Trajet, callback)
  {
    console.log("Insert trajet en cours...");
    db.query('INSERT INTO trajet (depart, arrivee) VALUES ($1, $2)', [Trajet.body.depart, Trajet.body.arrivee], callback);
  },

  // updateTrajet: function(Trajet, callback)
  // {
  //   console.log("Update trajet en cours...");
  //   db.query('UPDATE trajet SET nom = $1,prenom = $2,telephone = $3, sexe = $4, date_naiss = $5, descr = $6',callback);
  // },

  removeTrajet: function(Trajet, callback)
  {
    return db.query('DELETE FROM trajet WHERE id_User = Trajet.id_User', callback);
  },

  getTrajet: function(Trajet, callback)
  {
    return db.query('SELECT * FROM trajet WHERE id_User = Trajet.id_User',callback);
  }
};


module.exports = Trajet;

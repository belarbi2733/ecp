let db = require("../db.js");

let Voiture = {

  addVoiture: function (voiture,callback) {
    console.log('addVoiture: idUser = ', voiture.idUser);
    return db.query('INSERT INTO voiture (id_user, nom_marque, nom_modele, coffre) VALUES ($1,$2,$3,$4)',
      [voiture.idUser,voiture.marque, voiture.modele, voiture.volumeCoffre],
      callback);
  },

  updateVoiture: function(voiture,callback) {
    return db.query('UPDATE voiture SET nom_marque = $1, nom_modele = $2, coffre = $3 WHERE id_user = $4',
      [voiture.marque, voiture.modele, voiture.volumeCoffre, voiture.idUser],
      callback)
  },

  getAllCond: function(callback) {
    console.log("Get All Conducteur");
    return db.query('SELECT * FROM voiture', callback);
  },

  getDataVoitureById: function(id,callback) {
    console.log('getDataVoitureById : idUser = ', id);
    db.query('SELECT * FROM voiture WHERE id_user = $1',[id],callback);
  }
};


module.exports = Voiture;

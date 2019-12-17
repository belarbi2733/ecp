let db = require("./db.js");

let Voiture = {

  addVoiture: function (voiture,callback) {
    console.log('addVoiture: idUser = ', voiture.idUser);
    db.query('INSERT INTO voiture (id_user, nom_marque, nom_modele, coffre) VALUES ($1,$2,$3,$4)',[voiture.idUser,voiture.marque, voiture.modele, voiture.volumeCoffre],callback);
  },

  getDataVoitureById: function(id,callback) {
    console.log('getDataVoitureById : idUser = ', id);
    db.query('SELECT * FROM voiture WHERE id_user = $1',[id],callback);
  }
};


module.exports = Voiture;

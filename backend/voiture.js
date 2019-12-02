let db = require("./db.js");

let Voiture = {

  addVoiture: function (voiture,callback) {
    console.log('addVoiture: idUser = ', voiture.idUser);
    db.query('INSERT INTO voiture (id_user, nom_marque, nom_modele, nbre_places, coffre)',[voiture.idUser, voiture.modele, voiture]);
  }


};


module.exports = Voiture;

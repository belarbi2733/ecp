let db = require("./db.js");

let Voiture = {

  addVoiture: function (voiture,callback) {
    console.log('addVoiture: idUser = ', voiture.idUser);
    db.query('INSERT INTO voiture ()');
  }


};


module.exports = Voiture;

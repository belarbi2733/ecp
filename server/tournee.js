var db = require("./config/config.js");

let Tournee = {
  getTournee: function(tournee, callback)
  {
    return db.query('SELECT * FROM tournee WHERE id_voiture = (SELECT id FROM voiture WHERE id_user=$1)',[tournee.body.idUser],callback);
  },
  getTourneeAll: function(tournee, callback)
  {
    return db.query('SELECT * FROM tournee WHERE id =$1',[tournee.body.idTour],callback);
  },
  getIdTournee:function(tournee, callback)
  {
    return db.query('select id from tournee where id_voiture = $1',[tournee.body.idCar],callback);
  }
};

module.exports = Tournee;

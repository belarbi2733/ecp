
var db = require("./config/config.js");

let Colis = {

    getColis: function(trajet, callback)
    {
      return db.query('select * from colis where id=$1', [trajet.body.idColis],callback);
    },
    getColisOnly: function(id,callback){
      return db.query('SELECT * FROM trajet INNER JOIN colis ON trajet.id_colis = colis.id WHERE colis.id_user = $1 AND trajet.id_user IS null', [id], callback);
    }
};

module.exports = Colis;

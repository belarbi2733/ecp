
var db = require("./config/config.js");

let Utilisateur = {

    getUtilisateur: function(utilisateur, callback)
    {
      return db.query('SELECT * FROM utilisateur WHERE mail = $1', [utilisateur.body.mail],callback);
    },

    getIdUtilisateurByMail: function(mail, callback)
    {
      return db.query('SELECT id FROM utilisateur WHERE mail = $1', [mail], callback);
    },
    addPosition: function(utilisateur, callback){
      return db.query('UPDATE utilisateur SET position_lat = $1, position_long = $2 WHERE id = $3', [utilisateur.query['lat'], utilisateur.query['long'], utilisateur.query['idUser']], callback);
    },
    getDriver: function(idTour, callback){
      return db.query('select id_user from voiture where id = (select id_voiture from tournee where id = $1)',[idTour], callback);
    },
    getPosition: function(id, callback){
      return db.query('Select position_lat, position_long, prenom from utilisateur where id = $1', [id], callback);
    },

    getDataById: function(id, callback){
      return db.query('Select * from utilisateur where id = $1', [id], callback);
    },
    updateUtilisateur: function(utilisateur, callback){
      return db.query('UPDATE utilisateur SET avr_rating = $1, nbr_ratings= $2 WHERE id = $3', [utilisateur.avr_rating,utilisateur.nbr_ratings, utilisateur.id], callback);
    }
};

module.exports = Utilisateur;

let db = require("./db.js");

let Utilisateur = {

    addUtilisateur: function(utilisateur, callback)
    {
      console.log("Insert user en cours...");
      db.query('INSERT INTO utilisateur (mail,password,statut) VALUES ($1, $2)', [utilisateur.body.adresse_mail, utilisateur.body.mot_passe,1], callback);
    },

    updateUtilisateur: function(utilisateur, callback)
    {
      console.log("Update user en cours...");
      db.query('UPDATE Client SET nom = $1,prenom = $2,telephone = $3, sexe = $4, date_naiss = $5, descr = $6',callback);
    },

    removeUtilisateur: function(utilisateur, callback)
    {
        return db.query('DELETE FROM utilisateur WHERE id_User = utilisateur.id_User', callback);
    },

    getUtilisateur: function(utilisateur, callback)
    {
      console.log("getUser : " + utilisateur.body.mail);
      return db.query('SELECT password FROM utilisateur WHERE mail = $1', [utilisateur.body.mail],callback);
    }
};


module.exports = Utilisateur;

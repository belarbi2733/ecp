let db = require("./db.js");

let Utilisateur = {

    addUtilisateur: function(utilisateur, callback)
    {
      console.log("Insert user en cours...");
      db.query('INSERT INTO utilisateur (mail,password,statut) VALUES ($1, $2, $3)', [utilisateur.body.adresse_mail, utilisateur.body.mot_passe,1], callback);
    },

    updateUtilisateur: function(utilisateur, callback)
    {
      console.log("Update user en cours...");
      db.query('UPDATE utilisateur SET nom = $1,prenom = $2,telephone = $3, mail = $4, sexe = $5, date_naiss = $6, descr = $7 WHERE id = $8',
        [utilisateur.nom,utilisateur.prenom,utilisateur.tel,utilisateur.mail,utilisateur.sexe,utilisateur.date_naiss,utilisateur.description,utilisateur.idUser],
        callback);
    },

    removeUtilisateur: function(utilisateur, callback)
    {
      return db.query('DELETE FROM utilisateur WHERE id_User = utilisateur.id_User', callback);
    },

    checkPasswordByMail: function(utilisateur, callback)
    {
      console.log("checkPassword : " + utilisateur.mail);
      return db.query('SELECT password FROM utilisateur WHERE mail = $1', [utilisateur.mail],callback);
    },

    getIdUtilisateurByMail: function(mail, callback)
    {
      console.log("getId : " + mail);
      return db.query('SELECT id FROM utilisateur WHERE mail = $1', [mail], callback);
    },

    getDataById: function(id, callback)
    {
      console.log("getDataById : " + id);
      return db.query('SELECT * FROM utilisateur WHERE id = $1', [id], callback);
    }
};


module.exports = Utilisateur;

let db = require("../db.js");

let Utilisateur = {

  
    selectPhoto: function(idUser, callback)
    {
      console.log("select Photo de l'user : ");
      console.log("test");
      return db.query('SELECT photo FROM utilisateur where id=$1', [idUser] ,callback);
    },

    addUtilisateur: function(utilisateur, callback)
    {
      console.log("Insert user en cours...");
      return db.query('INSERT INTO utilisateur (mail,password,statut) VALUES ($1, $2, $3)', [utilisateur.body.adresse_mail, utilisateur.body.mot_passe,0], callback);
    },

    changeStatusUser: function(utilisateur, callback)
    {
      console.log("Changement du statut de l'utilisateur");
      return db.query('UPDATE utilisateur SET statut = $1 WHERE mail = $2', [1, utilisateur.adresse_mail], callback);
    },

    updateUtilisateur: function(utilisateur, callback)
    {
      console.log("Update user en cours...");
      //console.log(utilisateur.avr_rating);
      //console.log(utilisateur.nbr_ratings);
      return db.query('UPDATE utilisateur SET nom = $1,prenom = $2,telephone = $3, mail = $4, sexe = $5, date_naiss = $6, descr = $7 WHERE id = $8',
        [utilisateur.nom,utilisateur.prenom,utilisateur.tel,utilisateur.mail,utilisateur.sexe,utilisateur.date_naiss,utilisateur.description, utilisateur.idUser],
        callback);
    },

    removeUtilisateur: function(id, callback)
    {
      console.log('Delete Id : ' + id);
      return db.query('DELETE FROM utilisateur WHERE id = $1',[id], callback);
    },

    checkPasswordByMail: function(utilisateur, callback)
    {
      console.log("checkPassword : " + utilisateur.mail);
      return db.query('SELECT password, statut FROM utilisateur WHERE mail = $1', [utilisateur.mail], callback);
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
    },

    updateUtilisateurPref : function (utilisateur, callback) {
      console.log("update Pref, idUser : " + utilisateur.idUser);
      return db.query('UPDATE utilisateur SET pref_animaux = $1, pref_fumer = $2 WHERE id = $3',
        [utilisateur.prefAnimaux, utilisateur.prefFumer,utilisateur.idUser],
        callback);
    },

    getAllUser: function(callback)
    {
      console.log("Get All User");
      return db.query('SELECT * FROM utilisateur', callback);
    },

    updateRating: function(updateRating, callback){
    console.log("add new rating");
   /* return db.query('INSERT INTO utilisateur  WHERE id = $2 VALUES avr_rating = ($1)' , [utilisateur.body.avr_rating, utilisateur.body.id], callback);*/
  },

    addPhoto: function(pathPhoto,idUser, callback)
    {
      console.log("Insert photo en cours..." + idUser);
      db.query('UPDATE utilisateur SET photo = $1 WHERE id = $2',
      [pathPhoto,idUser],
      callback);
    }
};


module.exports = Utilisateur;

let db = require("../db.js");

let Statistiques = {


    getAllStat: function(callback)
    {
      console.log("select All Stat ");
      return db.query('SELECT * FROM statistiques ORDER BY id DESC LIMIT 12',callback);
    },

    enregStat: function(statistiques, callback)
    {
      console.log("enregistrer All Stat ");
      return db.query('INSERT INTO statistiques(nbre_users, nbre_colis, nbre_trajet, nbre_tournee, nbre_cond, nbre_colis_livr, nbre_traj_effec, nbre_tourn_effec, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [statistiques.nbreUsersStat, statistiques.nbreColisStat, statistiques.nbreTrajStat, statistiques.nbreTournStat, statistiques.nbreCondStat, statistiques.nbreColisLivrStat, statistiques.nbreTrajEffecStat, statistiques.nbreTournEffecStat, statistiques.date], callback);
    }
};


module.exports = Statistiques;

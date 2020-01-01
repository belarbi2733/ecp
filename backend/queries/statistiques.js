let db = require("../db.js");

let Statistiques = {


    getAllStat: function(callback)
    {
      console.log("select All Stat ");
      return db.query('SELECT * FROM statistiques ORDER BY id DESC LIMIT 12',callback);
    }
};


module.exports = Statistiques;

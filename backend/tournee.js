let db = require("./db.js");



let Tournee = {
  getDataTournee: function(x, callback)
  {
    console.log("Id : " + x);
    return db.query('SELECT * FROM trajet WHERE id= $1', [x],callback);
  }

};








module.exports = Tournee;

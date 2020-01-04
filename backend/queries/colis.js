let db = require("../db.js");

let Colis = {

  addColis: function(colis, callback)
  {
    console.log("Insert colis en cours...");
    return db.query('INSERT INTO colis (id_user,nom_colis,volume) VALUES ($1, $2, $3)',
      [colis.idUser, colis.nom, colis.volume], callback);
  },


  getIdColisByIdUser: function(colis, callback) {
    console.log("Get IdColis By IdUser and NomColis");
    console.log(colis.idUser,colis.nom);
    return db.query('SELECT id FROM colis WHERE id_user = $1 AND nom_colis = $2 AND volume = $3',
      [colis.idUser, colis.nom, colis.volume] , callback);
  },


  generateTrajet: function(colis, prix, idColis, callback) {
    let code = randomString(10);
    console.log("Generate Trajet en cours...");
    return db.query('INSERT INTO trajet (id_user, id_colis, departure_time, distance, prix, depart_address, arrivee_address, depart_x, depart_y, arrivee_x, arrivee_y, statut, code, book_places) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
      [colis.idUser,idColis,colis.departuretime,colis.distanceinmeters, prix, colis.departureAddress,colis.arrivalAddress,colis.departure[0],colis.departure[1],colis.arrival[0],colis.arrival[1],0, code,0],
      callback);
  },


  getVolumeByIdColis: function(idColis,callback) {
    console.log("Get Volume By : " + idColis);
    return db.query('SELECT volume from colis WHERE id = $1', [idColis], callback);
  },


  getAllColis: function(callback) {
    return db.query('SELECT * from colis', callback);
  },


  getDataColisByIdUser: function(id, callback)
  {
    console.log("getDataColisByIdUser: " + id);
    return db.query('SELECT * FROM colis INNER JOIN trajet ON colis.id=trajet.id_colis WHERE colis.id_user = $1', [id], callback);
  },

};


module.exports = Colis;


function randomString( len ) {
  let str = "";                                         // String result
  for(let i=0; i<len; i++){                             // Loop len times
    let rand = Math.floor( Math.random() * 62 );        // random: 0..61
    let charCode = rand+= rand>9? (rand<36?55:61) : 48; // Get correct charCode
    str += String.fromCharCode( charCode );             // add Character to str
  }
  return str;       // After all loops are done, return the concatenated string
}

let db = require("../db.js");
let Math = require('mathjs');

let Trajet = {

  addTrajet: function(trajet, prix, callback)
  {
    let code = randomString(10);
    console.log("Insert trajet en cours...");
    return db.query('INSERT INTO trajet (id_user, departure_time, distance, prix, depart_address, arrivee_address, depart_x, depart_y, arrivee_x, arrivee_y, statut, code, book_places) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13)',
      [trajet.idUser, trajet.departuretime, trajet.distanceinmeters, prix, trajet.departureAddress, trajet.arrivalAddress, trajet.departure[0], trajet.departure[1], trajet.arrival[0], trajet.arrival[1],0, code, trajet.places], callback);
  },

  addTrajetInTournee: function(idTournee, idTrajet, callback)
  {
    console.log("Update trajet en cours...");
    return db.query('UPDATE trajet SET id_tournee = $1, statut = $2 WHERE id = $3',[idTournee,1,idTrajet], callback);
  },

  updateTraj: function(data, callback)
  {
    console.log("updateStatus : " + data.id);
    return db.query('UPDATE trajet SET statut = $1 WHERE id = $2', [data.statut,data.id] ,callback);
  },

  deleteTraj: function(data, callback)
  {
    console.log("Suppression du trajet avec l'id : " + data.id);
    return db.query('DELETE FROM trajet WHERE id = $1', [data.id] ,callback);
  },

  getAllTrajetForTournee: function(callback) {
    return db.query('SELECT * FROM trajet', callback);
  },

  getAllTrajet: function(callback){
    return db.query('SELECT * FROM trajet WHERE id_colis IS NULL', callback);
  },

  // getAllTrajets: function(callback){
  //   return db.query('SELECT * FROM trajet WHERE statut >= 1 ORDER BY id DESC', callback);
  // },

  // getAllTrajets: function(callback){
  //   return db.query('SELECT trajet.id, trajet.depart_address, trajet.departure_time, trajet.book_places, trajet.prix, trajet.statut, u1.paypal as paypal, u2.paypal as paypalcond FROM trajet, utilisateur u1, utilisateur u2, tournee WHERE u1.id=trajet.id_user and trajet.id_tournee=tournee.id and tournee.id_user=u2.id ORDER BY trajet.departure_time DESC', callback);
  // },
  getAllTrajets: function(callback){
    return db.query('SELECT trajet.id, trajet.depart_address, trajet.departure_time, trajet.book_places, trajet.prix, trajet.statut, u1.paypal as paypal FROM trajet, utilisateur u1 WHERE u1.id=trajet.id_user ORDER BY trajet.departure_time DESC', callback);
  },

  getpaypalCond: function(callback){
    return db.query('SELECT trajet.id, u2.paypal as paypalcond FROM trajet, utilisateur u2, tournee WHERE trajet.id_tournee=tournee.id and tournee.id_user=u2.id ORDER BY trajet.departure_time DESC', callback);
  },

  getMonTraj: function(data, callback){
    return db.query('SELECT * FROM trajet WHERE id_user = $1 ORDER BY id DESC', [data.idUser], callback);
  },

  getAllTrajEffec: function(callback){
    console.log("Get All Trajet effectué");
    return db.query('SELECT * FROM trajet WHERE statut >= $1 AND id_colis IS NULL', [3], callback);
  },

  getAllColisLivr: function(callback)
  {
    console.log("Get All Colis livrés");
    return db.query('SELECT * FROM trajet WHERE statut >= $1 AND id_colis IS NOT NULL', [3], callback);
  },

  getTrajetById: function(iduser,callback)
  {
    console.log("getTrajetById : " + iduser);
    return db.query('SELECT * FROM trajet WHERE id_user = $1', [iduser], callback);
  },

  getTrajetPassagerOnlyById: function(iduser,callback)
  {
    console.log("getTrajetById : " + iduser);
    return db.query('SELECT * FROM trajet WHERE id_user = $1 AND id_colis is null', [iduser], callback);
  },



  getPrice: function(trajet, callback)
  {
    console.log("getPrice requete sql : ");
    return db.query('SELECT prix FROM trajet WHERE id_user = $1 AND id_tournee = $2 AND statut >= $3', [trajet.idUser, trajet.idTournee, 1],callback);
  },

  changeStatusTraj: function(statut, trajet, callback)
  {
    console.log("Changement du statut du trajet");
    return db.query('UPDATE trajet SET statut = $1 WHERE id = $2', [statut, trajet.id], callback);
  },

  findTrajetAroundRayon: function(search, trajet,rayonPerimetreKms, callback) {

    // 1° de latitude vaut 111,11km
    // Ca n'est pas la meme chose pour la longitude
    // Par exemple à Paris, la latitude vaut à peu près 48°. Donc 1° de longitude fait 111,11 x cos(48°) = 111,11 x 0,669 = 74 km. (valable sur une courte distance verticale genre pas 3000 km)
    // Du coup, si on vaut un rayon de recherche de 10km, on aura rayonPerimetre = 10


    //Pour la latitude, le calcul est simple pour avoir le rayon en ° on fait
    let rayonLatitude = rayonPerimetreKms/111.11;


    // Pour la longitude, il faut d'abord calculer cmb de kms fait un ° de longitude selon la latitude (voir exemple Paris)
    let oneLongitudeDegreeInKms = 111.11 * Math.cos(search.departure[1] * Math.pi / 180);   //departure[1] => latitude
    // Puis on effectue le même calcul que pour la latitude càd
    let rayonLongitude = rayonPerimetreKms/oneLongitudeDegreeInKms;


    // Affichage des ≠ valeurs pour vérifier
    // console.log('Kms : ' + rayonPerimetreKms + ' one ° in Kms ' + oneLongitudeDegreeInKms);
    // console.log('° :: long : ' + rayonLongitude + ' lat : ' + rayonLatitude);

    // Voila, nous avons maintenant notre perimetre en ° que l'on peut utiliser pour trouver les trajets souhaités
    // Le problème ne se traduit pas par une cercle mais par une ellipse...

    let differenceDepartX = trajet.depart_x - search.departure[0];
    let differenceDepartY = trajet.depart_y - search.departure[1];

    let differenceArriveeX = trajet.arrivee_x - search.arrival[0];
    let differenceArriveeY = trajet.arrivee_y - search.arrival[1];

    return db.query('SELECT * FROM trajet WHERE (((POW(($5),$2)/POW($3,$2)) + (POW(($6),$2)/POW($4,$2)) < $1)AND((POW(($7),$2)/POW($3,$2)) + (POW(($8),$2)/POW($4,$2)) < $1)) AND statut=$9',
      [1,2,rayonLongitude,rayonLatitude,differenceDepartX,differenceDepartY,differenceArriveeX,differenceArriveeY,4],
      callback);

    //departure[0] => longitude   (X)
    //departure[1] => latitude    (Y)

    // $1 => nombre 1 (aucun nombre ne peut etre dans la requete)
    // $2 => nombre 2
    // $3 => a càd rayonLongitude
    // $4 => b càd rayonLatitude

    // $5 => Diff Longitude du départ
    // $6 => Diff Latitude du départ
    // $7 => Diff Longitude de l'arrivée
    // $8 => Diff Latitude de l'arrivée

  },

  
  findMiniTrajet: function(search, trajet, callback) {

    // Calcul du point milieu
    let milieu = [(search.departure[0]+search.arrival[0])/2,(search.departure[1]+search.arrival[1])/2];
    // console.log('Milieu : ' + milieu);
    const rayonPerimetreKms = distance(milieu[1],milieu[0],search.departure[1], search.departure[0])*1.2;

    // 1° de latitude vaut 111,11km
    // Ca n'est pas la meme chose pour la longitude
    // Par exemple à Paris, la latitude vaut à peu près 48°. Donc 1° de longitude fait 111,11 x cos(48°) = 111,11 x 0,669 = 74 km. (valable sur une courte distance verticale genre pas 3000 km)
    // Du coup, si on vaut un rayon de recherche de 10km, on aura rayonPerimetre = 10

    //Pour la latitude, le calcul est simple pour avoir le rayon en ° on fait
    let rayonLatitude = rayonPerimetreKms/111.11;

    // Pour la longitude, il faut d'abord calculer cmb de kms fait un ° de longitude selon la latitude (voir exemple Paris)
    let oneLongitudeDegreeInKms = 111.11 * Math.cos(search.departure[1] * Math.pi / 180);   //departure[1] => latitude
    // Puis on effectue le même calcul que pour la latitude càd
    let rayonLongitude = rayonPerimetreKms/oneLongitudeDegreeInKms;

    // Affichage des ≠ valeurs pour vérifier
    // console.log('Kms : ' + rayonPerimetreKms + ' one ° in Kms ' + oneLongitudeDegreeInKms);
    // console.log('° :: long : ' + rayonLongitude + ' lat : ' + rayonLatitude);

    // Voila, nous avons maintenant notre perimetre en ° que l'on peut utiliser pour trouver les trajets souhaités
    // Le problème ne se traduit pas par une cercle mais par une ellipse...

    let differenceDepartX = trajet.depart_x - milieu[0];
    let differenceDepartY = trajet.depart_y - milieu[1];

    let differenceArriveeX = trajet.arrivee_x - milieu[0];
    let differenceArriveeY = trajet.arrivee_y - milieu[1];

    return db.query('SELECT * FROM trajet WHERE (((POW(($5),$2)/POW($3,$2)) + (POW(($6),$2)/POW($4,$2)) < $1)AND((POW(($7),$2)/POW($3,$2)) + (POW(($8),$2)/POW($4,$2)) < $1)) and statut=$9',
      [1,2,rayonLongitude,rayonLatitude,differenceDepartX,differenceDepartY,differenceArriveeX,differenceArriveeY,4],
      callback);

    //departure[0] => longitude   (X)
    //departure[1] => latitude    󰀀

    // $1 => nombre 1 (aucun nombre ne peut etre dans la requete)
    // $2 => nombre 2
    // $3 => a càd rayonLongitude
    // $4 => b càd rayonLatitude

    // $5 => Diff Longitude du départ
    // $6 => Diff Latitude du départ
    // $7 => Diff Longitude de l'arrivée
    // $8 => Diff Latitude de l'arrivée
  }

};


module.exports = Trajet;


function randomString( len ) {
  let str = "";                                         // String result
  for(let i=0; i<len; i++){                             // Loop len times
    let rand = Math.floor( Math.random() * 62 );        // random: 0..61
    let charCode = rand+= rand>9? (rand<36?55:61) : 48; // Get correct charCode
    str += String.fromCharCode( charCode );             // add Character to str
  }
  return str;       // After all loops are done, return the concatenated string
}

// Source : https://www.1formatik.com/2417/comment-calculer-distance-latitude-longitude-javascript
// Permet de calculer la distance en kilomètres en 2 points exprimés en coordonées géographiques
function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    let radlat1 = Math.pi * lat1/180;
    let radlat2 = Math.pi * lat2/180;
    let theta = lon1-lon2;
    let radtheta = Math.pi * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.pi;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }
}
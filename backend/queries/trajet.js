let db = require("../db.js");
let Math = require('mathjs');

let Trajet = {

  addTrajet: function(trajet, prix, callback)
  {
    console.log("Insert trajet en cours...");
    return db.query('INSERT INTO trajet (id_user, departure_time, distance, prix, depart_address, arrivee_address, depart_x, depart_y, arrivee_x, arrivee_y, statut, book_places) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)',
      [trajet.idUser, trajet.departuretime, trajet.distanceinmeters, prix, trajet.departureAddress, trajet.arrivalAddress, trajet.departure[0], trajet.departure[1], trajet.arrival[0], trajet.arrival[1],0, trajet.places], callback);
  },

  addTrajetInTournee: function(idTournee, idTrajet, callback)
  {
    console.log("Update trajet en cours...");
    return db.query('UPDATE trajet SET id_tournee = $1, statut = $2 WHERE id = $3',[idTournee,1,idTrajet], callback);
  },

  getAllTrajet: function(callback){
    return db.query('SELECT * FROM trajet', callback);
  },

  getTrajetById: function(callback)
  {
    console.log("getTrajetById : " + 1);
    return db.query('SELECT * FROM trajet', callback);
  },

  getPrice: function(trajet, callback)
  {
    console.log("getPrice : ");
    console.log("test");
    return db.query('SELECT prix FROM trajet WHERE id_user = $1 AND id_tournee = $2 AND statut = $3', [trajet.idUser, trajet.idTournee, 1],callback);
  },

  changeStatusTraj: function(statut, trajet, callback)
  {
    console.log("Changement du statut du trajet");
    return db.query('UPDATE trajet SET statut = $1 WHERE id_user = $2 AND id_tournee = $3', [statut, trajet.idUser, trajet.idTournee], callback);
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

    return db.query('SELECT * FROM trajet WHERE (((POW(($5),$2)/POW($3,$2)) + (POW(($6),$2)/POW($4,$2)) < $1)AND((POW(($7),$2)/POW($3,$2)) + (POW(($8),$2)/POW($4,$2)) < $1))',
      [1,2,rayonLongitude,rayonLatitude,differenceDepartX,differenceDepartY,differenceArriveeX,differenceArriveeY],
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


  findMiniTrajet: function(search, trajet, rayonPerimetreKms, callback) {

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

    // Calcul du point milieu
    let milieu = [(search.departure[0]+search.arrival[0])/2,(search.departure[1]+search.arrival[1])/2];
    // console.log('Milieu : ' + milieu);

    // Affichage des ≠ valeurs pour vérifier
    // console.log('Kms : ' + rayonPerimetreKms + ' one ° in Kms ' + oneLongitudeDegreeInKms);
    // console.log('° :: long : ' + rayonLongitude + ' lat : ' + rayonLatitude);

    // Voila, nous avons maintenant notre perimetre en ° que l'on peut utiliser pour trouver les trajets souhaités
    // Le problème ne se traduit pas par une cercle mais par une ellipse...

    let differenceDepartX = trajet.depart_x - milieu[0];
    let differenceDepartY = trajet.depart_y - milieu[1];

    let differenceArriveeX = trajet.arrivee_x - milieu[0];
    let differenceArriveeY = trajet.arrivee_y - milieu[1];

    return db.query('SELECT * FROM trajet WHERE (((POW(($5),$2)/POW($3,$2)) + (POW(($6),$2)/POW($4,$2)) < $1)AND((POW(($7),$2)/POW($3,$2)) + (POW(($8),$2)/POW($4,$2)) < $1))',
      [1,2,rayonLongitude,rayonLatitude,differenceDepartX,differenceDepartY,differenceArriveeX,differenceArriveeY],
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
  }

};


module.exports = Trajet;

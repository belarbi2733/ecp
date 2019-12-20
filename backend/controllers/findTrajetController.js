let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Voiture = require('../queries/voiture');
let Colis = require('../queries/colis');
let Trajet = require('../queries/trajet');
let Tournee = require('../queries/tournee');
let Math = require('mathjs');
let _ = require('underscore');
let Python = require('../algoRun/processes');



//On ajoute un colis, puis on va recup son id qui a été incrémenter pour pouvoir générer le trajet découlant de ce colis

router.post('/matchDriverTrajet', function(req,res) {
  console.log(req.body);
  Voiture.getDataVoitureById(req.body.idUser, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log('Error 1');
      console.log(err);
    } else {
      if(result.rows.length) {
        Trajet.getAllTrajet(function (err2,result2) {
          if(err2) {
            res.status(400).json(err2);
            console.log('Error 2');
          }
          else
          {
            if(result2.rows.length) {
              const search = req.body;
              //let arrayTrajet = {"chauffeur":[result.rows[0].nbre_places-1,search.departure[1],search.departure[0],search.arrival[1],search.arrival[0]]};
              //let arrayColis = {"chauffeur":[result.rows[0].coffre,search.departure[1],search.departure[0],search.arrival[1],search.arrival[0]]};

              let colisJson = {};
              let trajetJson = {};
              let i = 0;
              let j = 0;
              let jsonKeyColis = 'chauffeur';
              let jsonKeyTrajet = 'chauffeur';

              colisJson[jsonKeyColis] = [
                search.idUser,
                result.rows[0].coffre,
                search.detourMax,
                search.departure[1],
                search.departure[0],
                search.arrival[1],
                search.arrival[0]
              ];
              i++;

              trajetJson[jsonKeyTrajet] = [
                search.idUser,
                search.nbrePlaces,
                search.detourMax,
                search.departure[1],
                search.departure[0],
                search.arrival[1],
                search.arrival[0],
                result.rows[0].coffre,
              ];
              j++;

              /*let arrayColis = [{
                idChauffeur: search.idUser,
                volume: result.rows[0].coffre,
                detourMax: req.body.detourMax,
                latDepart: search.departure[1],
                longDepart: search.departure[0],
                latArrivee: search.arrival[1],
                longArrivee: search.arrival[0]
              }];

              let arrayTrajet = [{
                idChauffeur: search.idUser,
                places: search.nbrePlaces,
                detourMax: search.detourMax,
                latDepart: search.departure[1],
                longDepart: search.departure[0],
                latArrivee: search.arrival[1],
                longArrivee: search.arrival[0],
                coffre: result.rows[0].coffre
              }];*/

              Colis.getAllColis(function (err3, result3) {
                if (err3) {
                  res.status(400).json(err3);
                  console.log('Error 3 on Mini Trajet');
                  console.log(err3);
                  return -1;
                } else {
                  _.each(result2.rows, function (one) { // bibliothèque underscore _     //Pour chaque trajet, check

                    Trajet.findTrajetAroundRayon(req.body, one, 10, function (err4, result4) {  //req.body => search
                      if (err4) {
                        res.status(400).json(err4);
                        console.log('Error 4 on Find Trajet');
                        console.log(err4);
                        return -1;
                      } else {
                        if (result4.rows.length) {

                          let dist = distance(req.body.departure[1],req.body.departure[0],one.depart_y,one.depart_x);

                          if(one.id_colis) {
                            //Séquence si c'est un colis
                            jsonKeyColis = 'colis' + i;

                            colisJson[jsonKeyColis] = [
                              one.id_colis,
                              dist,
                              result3.rows[one.id_colis-1].volume,  // On va chercher le volume de l'id_colis correspondant
                              one.prix,
                              one.depart_y,
                              one.depart_x,
                              one.arrivee_y,
                              one.arrivee_x
                            ];
                            i++;

                            /*arrayColis.push({
                              idColis: one.id_colis,
                              distance: dist,
                              volume: result3.rows[one.id_colis-1].volume,  // On va chercher le volume de l'id_colis correspondant
                              prix: one.prix,
                              latDepart: one.depart_y,
                              longDepart: one.depart_x,
                              latArrivee: one.arrivee_y,
                              longArrivee: one.arrivee_x
                            });*/
                            //console.log(JSON.stringify(arrayColis));
                            //console.log('Colis : ' + one.id_colis + ' id : ' + one.id);

                          } else {
                            //Séquence si c'est un trajet

                            jsonKeyTrajet = 'trajet' + j;

                            trajetJson[jsonKeyTrajet] = [
                              one.id,
                              dist,
                              1,
                              one.prix,
                              one.depart_y,
                              one.depart_x,
                              one.arrivee_y,
                              one.arrivee_x,
                              0
                            ];
                            j++;

                            /*arrayTrajet.push({
                              idTrajet: one.id,
                              distance: dist,
                              volume: 1,
                              prix: one.prix,
                              latDepart: one.depart_y,
                              longDepart: one.depart_x,
                              latArrivee: one.arrivee_y,
                              longArrivee: one.arrivee_x,
                              volumeBagage: 0
                            });*/
                            // console.log(JSON.stringify(arrayTrajet));
                            //console.log('Trajet : ' + one.id);
                          }
                        }
                      }
                      //console.log('Colis' + JSON.stringify(arrayColis));
                      //console.log('Trajet' + JSON.stringify(arrayTrajet));
                      //const objJson = arrayColis + arrayTrajet;
                      console.log('Colis' + JSON.stringify(colisJson));
                      console.log('Trajet' + JSON.stringify(trajetJson));
                      Python.runPy(colisJson)
                        .then(()=> {
                          /*Tournee.createTournee(result.rows[0].id, search, function (err5,result5) {
                            if(err5) {
                              console.log('err insert tournée' + err5);
                              res.json(err5);
                            }
                            else {
                              console.log(result5);
                            }
                          });*/
                          console.log('Création de la tournée');
                        }
                      )
                    });
                  });
                }
              });
            }
            else {
              res.json(null);
            }
          }
        });
      } else {
        res.json(false);
        console.log('pas de voiture');
      }
    }
  });
});

router.post('/miniTrajet', function(req,res) {

  console.log(req.body);
  Voiture.getDataVoitureById(req.body.idUser, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log('Error 1 on Mini Trajet');
    } else {
      if(result.rows.length) {
        Trajet.getAllTrajet(function (err2,result2) {
          if(err2) {
            res.status(400).json(err2);
            console.log('Error 2 on Mini Trajet');
          }
          else
          {
            if(result2.rows.length) {
              const search = req.body;

              let arrayMiniColis = [{
                idChauffeur: req.body.idUser,
                places: result.rows[0].coffre,
                latDepart: search.departure[1],
                longDepart: search.departure[0],
                latArrivee: search.arrival[1],
                longArrivee: search.arrival[0]
              }];

              let arrayMiniTrajet = [{
                idChauffeur: req.body.idUser,
                places: search.nbrePlaces,
                latDepart: search.departure[1],
                longDepart: search.departure[0],
                latArrivee: search.arrival[1],
                longArrivee: search.arrival[0]
              }];


              Colis.getAllColis(function (err3, result3) {
                if (err3) {
                  res.status(400).json(err3);
                  console.log('Error 3 on Mini Trajet');
                  console.log(err3);
                  return -1;
                } else {
                  _.each(result2.rows, function(one) { // bibliothèque underscore _     //Pour chaque trajet, check

                    Trajet.findMiniTrajet(req.body,one,100, function (err4, result4) {  //req.body => search
                      if(err4) {
                        res.status(400).json(err4);
                        console.log('Error 4 on Mini Trajet');
                        console.log(err4);
                        return -1;
                      }
                      else {
                        if (result4.rows.length) {

                          let dist = distance(req.body.departure[1],req.body.departure[0],one.depart_y,one.depart_x);
                          // console.log(dist);

                          if(one.id_colis) {
                            //Séquence si c'est un colis
                            arrayMiniColis.push({
                              idColis: one.id_colis,
                              distance: dist,
                              volume: result3.rows[one.id_colis-1].volume,  // On va chercher le volume de l'id_colis correspondant
                              prix: one.prix,
                              latDepart: one.depart_y,
                              longDepart: one.depart_x,
                              latArrivee: one.arrivee_y,
                              longArrivee: one.arrivee_x
                            });
                            //console.log(JSON.stringify(arrayMiniColis));
                            //console.log('Mini Colis : ' + one.id_colis + ' id : ' + one.id);

                          } else {
                            //Séquence si c'est un trajet
                            arrayMiniTrajet.push({
                              idTrajet: one.id,
                              distance: dist,
                              volume: 1,
                              prix: one.prix,
                              latDepart: one.depart_y,
                              longDepart: one.depart_x,
                              latArrivee: one.arrivee_y,
                              longArrivee: one.arrivee_x
                            });
                            // console.log(JSON.stringify(arrayMiniTrajet));
                            //console.log('Mini Trajet : ' + one.id);
                          }
                        }
                      }

                      //console.log('Mini Colis' + JSON.stringify(arrayMiniColis));
                      //console.log('Mini Trajet' + JSON.stringify(arrayMiniTrajet));
                      const objJsonMini = arrayMiniColis + arrayMiniTrajet;

                    });
                  });
                }
              });
            }
            else {
              res.json(null);
            }
          }
        });
      } else {
        res.json(false);
      }
    }
  });
});

// Source : https://www.1formatik.com/2417/comment-calculer-distance-latitude-longitude-javascript
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

/*function setTournee(idVoiture, search) {
    Tournee.createTournee
}*/

module.exports = router;

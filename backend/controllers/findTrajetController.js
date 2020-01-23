let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Voiture = require('../queries/voiture');
let Colis = require('../queries/colis');
let Trajet = require('../queries/trajet');
let Tournee = require('../queries/tournee');
let Itineraire = require('../queries/itineraire');
let Math = require('mathjs');
let _ = require('underscore');
let Python = require('../algoRun/processes');




//On ajoute un colis, puis on va recup son id qui a été incrémenter pour pouvoir générer le trajet découlant de ce colis

router.post('/matchDriverTrajet', function(req,res) {
  console.log('Input from Angular : ' + JSON.stringify(req.body));
  Voiture.getDataVoitureById(req.body.idUser, function (err, result) {
    if(err) {
      res.status(400).json(err);
      // console.log('Error 1');
      console.error(err);
    } else {
      if(result.rows.length) {
        Trajet.getAllTrajetForTournee(function (err2,result2) {
          if(err2) {
            res.status(400).json(err2);
            console.error(err2);
            // console.log('Error 2');
          }
          else
          {
            if(result2.rows.length) {
              const search = req.body;
              console.log("TESTEST : " + search.choix);

              //let arrayTrajet = {"chauffeur":[result.rows[0].nbre_places-1,search.departure[1],search.departure[0],search.arrival[1],search.arrival[0]]};
              //let arrayColis = {"chauffeur":[result.rows[0].coffre,search.departure[1],search.departure[0],search.arrival[1],search.arrival[0]]};

              let colisJson = {};
              let trajetJson = {};
              let miniColisJson = {};
              let miniTrajetJson = {};
              let i = 0; // indice colisJson
              let j = 0; // indice trajetJson
              let k = 1; // indice miniColisJson
              let l = 1; // indice miniTrajetJson
              let jsonKeyColis = 'chauffeur';
              let jsonKeyTrajet = 'chauffeur';
              let jsonKeyMiniColis = '';
              let jsonKeyMiniTrajet = '';

              //tableau de booleans qui permet de ne pas mettre un trajet gardé dans les mini trajets
              let catchColis = [];
              let catchTrajet = [];

              for(let z = 0; z < 100; z++) {
                catchColis.push(false);
                catchTrajet.push(false);
              }

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

              Colis.getAllColis(function (err3, result3) {
                if (err3) {
                  res.status(400).json(err3);
                  //console.log('Error 3');
                  console.error(err3);
                  return -1;
                } else {

                  let iter = 0;
                  let iter2 = 1;
                  _.each(result2.rows, function (one) { // bibliothèque underscore _  => Pour chaque trajet, check

                    //Première sélection assez restreinte sur un rayon de 10kms selon les points de départ et d'arrivée
                    Trajet.findTrajetAroundRayon(req.body, one, 10, function (err4, result4) {  //req.body => search
                      iter++;
                      // console.log(one);
                      if (err4) {
                        res.status(400).json(err4);
                        //console.log('Error 4');
                        console.error(err4);
                        return -1;
                      } else {
                        if (result4.rows.length) {

                          let dist = distance(req.body.departure[1],req.body.departure[0],one.depart_y,one.depart_x);
                          if(one.id_colis) {
                            //Séquence si c'est un colis
                            jsonKeyColis = 'colis' + i;
                            colisJson[jsonKeyColis] = [
                              one.id,
                              dist,
                              result3.rows[one.id_colis-1].volume,  // On va chercher le volume de l'id_colis correspondant
                              one.prix,
                              one.depart_y,
                              one.depart_x,
                              one.arrivee_y,
                              one.arrivee_x
                            ];
                            i++;
                            catchColis[iter] = true;
                          } else {
                            //Séquence si c'est un trajet

                            jsonKeyTrajet = 'passager' + j;

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
                            catchTrajet[iter] = true;
                          }
                        }
                      }
                      //console.log('Colis' + JSON.stringify(colisJson));
                      //console.log('Trajet' + JSON.stringify(trajetJson));

                      //Quand le dernier trajet a été traité on enregistre la tournée, on ajoute l'id_tournée dans les trajets et on crée l'itinéraire
                      if(iter === result2.rows.length && iter2 === result2.rows.length+1) {
                        console.log('END forLoop : Trajet iter : ' + iter + ' id : ' + one.id);
                        console.log(catchColis);
                        console.log(catchTrajet);
                        iter = 0;
                        iter2 = 0; // Cela évite passer dans la deuxième fin
                        setTournee(search.idUser, result.rows[0].id, colisJson, trajetJson,miniColisJson,miniTrajetJson, search, function(dataForAngular){
                          console.log('Res JSON : ' + JSON.stringify(dataForAngular));
                          res.json(dataForAngular);
                        });
                      } else {
                        console.log('Trajet iter : ' + iter + ' id : ' + one.id);
                      }
                    });

                    // Selection plus large avec les mini-trajets
                    Trajet.findMiniTrajet(req.body,one, function (err4, result4) {  //req.body => search
                      iter2++;
                      // console.log(one);
                      if (err4) {
                        res.status(400).json(err4);
                        //console.log('Error 4');
                        console.error(err4);
                        return -1;
                      } else {
                        if (result4.rows.length) {

                          let dist = distance(req.body.departure[1],req.body.departure[0],one.depart_y,one.depart_x);
                          if(one.id_colis && catchColis[iter2] !== true) {
                            console.log("iter2 : " + iter2);
                            //Séquence si c'est un colis
                            jsonKeyMiniColis = 'colis' + k;
                            miniColisJson[jsonKeyMiniColis] = [
                              one.id,
                              dist,
                              result3.rows[one.id_colis-1].volume,  // On va chercher le volume de l'id_colis correspondant
                              one.prix,
                              one.depart_y,
                              one.depart_x,
                              one.arrivee_y,
                              one.arrivee_x
                            ];
                            k++;
                          } else {
                            if(catchTrajet[iter2] !== true) {
                              //Séquence si c'est un trajet

                              jsonKeyMiniTrajet = 'passager' + l;

                              miniTrajetJson[jsonKeyMiniTrajet] = [
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
                              l++;
                            }
                          }
                        }
                      }
                      //console.log('Colis' + JSON.stringify(colisJson));
                      //console.log('Trajet' + JSON.stringify(trajetJson));

                      //Quand le dernier trajet a été traité on enregistre la tournée, on ajoute l'id_tournée dans les trajets et on crée l'itinéraire
                      if(iter === result2.rows.length && iter2 === result2.rows.length+1) {
                        console.log('END forLoop in miniTrajet : Trajet iter : ' + iter2 + ' id : ' + one.id);
                        console.log(catchColis);
                        console.log(catchTrajet);
                        iter = 0;
                        iter2 = 0; // Cela évite passer dans la deuxième fin
                        setTournee(search.idUser, result.rows[0].id, colisJson, trajetJson, miniColisJson, miniTrajetJson, search,function(dataForAngular){
                          console.log('Res JSON : ' + JSON.stringify(dataForAngular));
                          res.json(dataForAngular);
                        });
                      } else {
                        console.log('MiniTrajet iter2 : ' + iter2 + ' id : ' + one.id);
                      }
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



function setTournee(idUser, idVoiture, colisJson, trajetJson, miniColisJson, miniTrajetJson,  infosSearch, callback) {
  console.log('Type de colis/trajet : ' + infosSearch.choix);
  console.log('Trajet' + JSON.stringify(trajetJson));
  console.log('Colis' + JSON.stringify(colisJson));
  console.log('MiniTrajet' + JSON.stringify(miniTrajetJson));
  console.log('MiniColis' + JSON.stringify(miniColisJson));
  
    Python.runPy(colisJson, trajetJson, miniColisJson, miniTrajetJson, infosSearch.choix)
      .then((data)=> {

        // console.log('Output Python in node : ' + data);
        const outputStr = data.replace(/'/g,'"');
        const outputJson = JSON.parse(outputStr);
        console.log('Output Python JSON in node : ' + JSON.stringify(data));


      Tournee.createTournee(idUser, idVoiture, infosSearch, outputJson['parcours'][1], function (err,result) {  // outputJson['tournee'][0] => distance de la tournée
        if(err) {
          res.status(400).json(err);
          console.error(err);
        }
        else {
          const idTournee = result.rows[0].id;
          const nbrePassager = Object.keys(outputJson).length-1;  //Taille du json -1

            Itineraire.addTrajetItineraire(idTournee, null, 1, infosSearch.departure, function (err2, result2) {
              if (err2) {
                res.status(400).json(err2);
                console.error(err2);
              } else {
                //console.log(result2);
                for (let i = 2; i < nbrePassager; i++) {
                  console.log('iter in set tournee : '+ i);

                  // const idDriver = outputJson['parcours'][0];
                  // console.log(idDriver);
                  let idTrajet = outputJson['adresse' + i][0];
                  const point = [outputJson['adresse' + i][2], outputJson['adresse' + i][1]];  // indice 2 => longitude indice 1 => latitude

                  Itineraire.addTrajetItineraire(idTournee, idTrajet, i, point, function (err3, result3) {
                    if (err3) {
                      res.status(400).json(err3);
                      console.error(err3);
                      return -1;
                    } else {
                      //console.log(result3);
                      Trajet.addTrajetInTournee(idTournee, idTrajet, function (err4, result4) {
                        if (err4) {
                          res.status(400).json(err4);
                          console.error(err4);
                          return -1;
                        } else {
                          //console.log(result4);
                        }
                      });
                    }
                  });

                  if(i == nbrePassager - 2) {
                    //Ajout du point d'arrivée de la tournée/itinéraire lors du dernier passage dans la boucle
                    Itineraire.addTrajetItineraire(idTournee, null, nbrePassager, infosSearch.arrival, function (err5, result5) {
                      if (err5) {
                        res.status(400).json(err5);
                        console.error(err5);
                        return -1;
                      } else {
                        //console.log(result5);
                        callback(outputJson);
                      }
                    });
                  }
                }
              }
            });
          }
        });

      })
      .catch((err) => {
        console.error('Erreur dans le code Python : \n' + err);
      });

}

module.exports = router;

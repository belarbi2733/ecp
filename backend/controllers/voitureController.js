let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Voiture = require('../queries/voiture');


router.post('/update', function(req,res) {
  // console.log(req.body);
  Voiture.getDataVoitureById(req.body.idUser, function(err, result) {
    if(err) {
      res.status(400).json(err);
      console.error(err);
    } else {
      if(result.rows.length) { //Si l'utilisateur a déjà une voiture, on la modifie
        Voiture.updateVoiture(req.body,function(err2,result2) {
          if(err2) {
            res.status(400).json(err2);
            console.error(err2);
          }
          else {
            console.log(result2);
            res.json(result2);
          }
        });
      } else { //Sinon on crée une voiture pour l'utilisateur
        Voiture.addVoiture(req.body,function(err2,result2) {
          if(err2) {
            res.status(400).json(err2);
            console.error(err2);
          }
          else {
            console.log(result2);
            res.json(result2);
          }
        });
      }
    }
  });
});

router.post('/getDataByIdUser' , function (req,res) {
  // console.log(req.body);
  Voiture.getDataVoitureById(req.body.idUser, function(err, result) {
    // console.log(req.body);
    if(err) {
      res.status(400).json(err);
      console.error(err);
    }
    else
    {
      if(result.rows.length) {
        const tmpResult = result.rows[0];
        let objJson = {      // Je crée cet objet objJson pour restructurer les variables de result.rows et aussi pour éviter d'envoyer des données sensibles contenu dans result.rows comme le mot de passe
          "marque": tmpResult.nom_marque,
          "modele": tmpResult.nom_modele,
          "volumeCoffre": tmpResult.coffre,

        };
        console.log(JSON.stringify(objJson));
        res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
      }
      else {
        res.json(null); // Renvoie null si ok avec la database mais aucune voiture n'a ete trouve pour l'user
      }
    }
  });
});

module.exports = router;

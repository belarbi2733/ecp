let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let User = require('../queries/user');

router.post('/personalData/getDataUser', function(req,res) {
  User.getDataById(req.body.idUser, function(err, result) {
    // console.log(req.body);
    if(err) {
      res.status(400).json(err);
      console.log(err);
    }
    else
    {
      const tmpResult = result.rows[0];
      //console.log(result.rows[0]);
      let objJson = {      // Je crée cet objet objJson pour restructurer les variables de result.rows et aussi pour éviter d'envoyer des données sensibles contenu dans result.rows comme le mot de passe
        "nom": tmpResult.nom,
        "prenom": tmpResult.prenom,
        "tel": tmpResult.telephone,
        "mail": tmpResult.mail,
        "sexe": tmpResult.sexe,
        "date_naiss": tmpResult.date_naiss,
        "description": tmpResult.descr
      };
      //console.log(JSON.stringify(objJson));
      res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
    }
  });
});

/*-----------------------------8-------------------------------------------------------------------------------- */

router.post('/personalData/update',function (req,res) {
  // console.log(req.body);
  User.updateUtilisateur(req.body,function (err,result) {
    if(err) {
      res.status(400).json(err);
      console.log(err);
    }
    else {
      console.log(result);
      res.json(result);
    }
  });
});

router.post('/deleteAccount', function (req,res) {
  console.log(req.body);
  User.removeUtilisateur(req.body.idUser, function (err,result) {
    if(err) {
      res.status(400).json(err);
      console.log(err);
    }
    else {
      // console.log(result);
      res.json(result);
    }
  });
});

router.post('/pref/update' , function (req,res) {
  // console.log(req.body);
  // console.log(req.body.idUser);
  User.updateUtilisateurPref(req.body, function (err, result) {
    if(err) {
      res.status(400).json(err);
    }
    else {
      // console.log(result);
      res.json(result);
    }
  })
});

router.post('/pref/getPref' , function (req,res) {
  console.log(req.body);
  User.getDataById(req.body.idUser, function(err, result) {
    // console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      const tmpResult = result.rows[0];
      // console.log(result.rows[0]);
      let objJson = {      // Je crée cet objet objJson pour restructurer les variables de result.rows et aussi pour éviter d'envoyer des données sensibles contenu dans result.rows comme le mot de passe
        "prefAnimaux": tmpResult.pref_animaux,
        "prefFumer": tmpResult.pref_fumer,
      };
      //console.log(JSON.stringify(objJson));
      res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
    }
  });
});

router.post('/rating' , function (req,res) {
  User.getDataById(req.body.idUser, function(err, result) {
    if(err) {
      res.status(400).json(err);
      console.log(err);
    }
    else
    {
      let userData = result.rows[0];
      let newNote = 2.5; /* Instance new note from mobile app*/
      let avrRating = userData.avr_rating;
      let nbrRatings = userData.nbr_ratings;

      let newRating = ((avrRating*nbrRatings)+newNote)/(nbrRatings+1);

      newRating = newRating.toFixed(2); /* Round the result to 2 decimal */
      userData.avr_rating = newRating;
      userData.nbr_ratings = nbrRatings + 1;
      console.log(result.rows[0]);
      User.updateUtilisateur(userData, function(err2, result2) {
        if(err2) {
          res.status(400).json(err2);
        } else {
          res.json(newRating);  // on peut renvoyer userData aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
        }
      });
    }
  });
});


module.exports = router;

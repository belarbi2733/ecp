let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let User = require('../queries/user');
let Trajet = require('../queries/trajet');
let Colis = require('../queries/colis');
let Tournee = require('../queries/tournee');
let Voiture = require('../queries/voiture');


router.get('/getNbreUsers', function(req,res) {
  console.log('Request');
  User.getAllUser(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      let objJson = {
        "nbreUsersStat": result.rows.length
      };
      console.log(objJson)
      res.json(objJson);
    }
  });
});


router.get('/getNbreColis', function(req,res) {
  console.log('Request');
  Colis.getAllColis(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      let objJson = {
        "nbreColisStat": result.rows.length
      };
      console.log(objJson)
      res.json(objJson);
    }
  });
});


router.get('/getNbreTraj', function(req,res) {
  console.log('Request');
  Trajet.getAllTrajet(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      let objJson = {
        "nbreTrajStat": result.rows.length
      };
      console.log(objJson)
      res.json(objJson);
    }
  });
});


router.get('/getNbreTourn', function(req,res) {
  console.log('Request');
  Tournee.getAllTourn(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      let objJson = {
        "nbreTournStat": result.rows.length
      };
      console.log(objJson)
      res.json(objJson);
    }
  });
});


router.get('/getNbreCond', function(req,res) {
  console.log('Request');
  Voiture.getAllCond(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      let objJson = {
        "nbreCondStat": result.rows.length
      };
      console.log(objJson)
      res.json(objJson);
    }
  });
});


router.get('/getNbreColisLivr', function(req,res) {
  console.log('Request');
  Trajet.getAllColisLivr(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      let objJson = {
        "nbreColisLivrStat": result.rows.length
      };
      console.log(objJson)
      res.json(objJson);
    }
  });
});


router.get('/getNbreTrajEffec', function(req,res) {
  console.log('Request');
  Trajet.getAllTrajEffec(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      let objJson = {
        "nbreTrajEffecStat": result.rows.length
      };
      console.log(objJson)
      res.json(objJson);
    }
  });
});


router.get('/getNbreTournEffec', function(req,res) {
  console.log('Request');
  Tournee.getAllTournEffec(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      let objJson = {
        "nbreTournEffecStat": result.rows.length
      };
      console.log(objJson);
      res.json(objJson);
    }
  });
});


module.exports = router;

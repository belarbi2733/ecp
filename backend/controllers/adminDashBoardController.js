let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let User = require('../queries/user');
let Trajet = require('../queries/trajet');
let Colis = require('../queries/colis');
let Tournee = require('../queries/tournee');
let Voiture = require('../queries/voiture');
let Statistiques = require('../queries/statistiques');


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
      console.log(objJson)
      res.json(objJson);
    }
  });
});


router.get('/getNbreUsersTab', function(req,res) {
  console.log('Request');
  Statistiques.getAllStat(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      if(result.rows.length) {
        var nbreU = [];
        var chartL = [];
        for (let i = 0; i < result.rows.length; i++) {
          var tmpResult = result.rows[i];
          console.log(tmpResult);
          nbreU.unshift(tmpResult.nbre_users);
          chartL.unshift(tmpResult.date.toDateString());
          console.log(nbreU);
          console.log(chartL);
        }
        let objJson = {
          "dataUser": nbreU,
          "chartLabels": chartL
        };
      console.log(objJson)
      res.json(objJson);
      } else {
        res.json(false);
      }
    }
  });
});


router.get('/getNbreColisTab', function(req,res) {
  console.log('Request');
  Statistiques.getAllStat(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      if(result.rows.length) {
        var nbreC = [];
        var chartL = [];
        for (let i = 0; i < result.rows.length; i++) {
          var tmpResult = result.rows[i];
          console.log(tmpResult);
          nbreC.unshift(tmpResult.nbre_colis);
          chartL.unshift(tmpResult.date.toDateString());
          console.log(nbreC);
          console.log(chartL);
        }
        let objJson = {
          "dataColis": nbreC,
          "chartLabels": chartL
        };
      console.log(objJson)
      res.json(objJson);
      } else {
        res.json(false);
      }
    }
  });
});


router.get('/getNbreTrajTab', function(req,res) {
  console.log('Request');
  Statistiques.getAllStat(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      if(result.rows.length) {
        var nbreT = [];
        var chartL = [];
        for (let i = 0; i < result.rows.length; i++) {
          var tmpResult = result.rows[i];
          console.log(tmpResult);
          nbreT.unshift(tmpResult.nbre_trajet);
          chartL.unshift(tmpResult.date.toDateString());
          console.log(nbreT);
          console.log(chartL);
        }
        let objJson = {
          "dataTraj": nbreT,
          "chartLabels": chartL
        };
      console.log(objJson)
      res.json(objJson);
      } else {
        res.json(false);
      }
    }
  });
});


router.get('/getNbreTournTab', function(req,res) {
  console.log('Request');
  Statistiques.getAllStat(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      if(result.rows.length) {
        var nbreTo = [];
        var chartL = [];
        for (let i = 0; i < result.rows.length; i++) {
          var tmpResult = result.rows[i];
          console.log(tmpResult);
          nbreTo.unshift(tmpResult.nbre_tournee);
          chartL.unshift(tmpResult.date.toDateString());
          console.log(nbreTo);
          console.log(chartL);
        }
        let objJson = {
          "dataTourn": nbreTo,
          "chartLabels": chartL
        };
      console.log(objJson)
      res.json(objJson);
      } else {
        res.json(false);
      }
    }
  });
});


router.get('/getNbreCondTab', function(req,res) {
  console.log('Request');
  Statistiques.getAllStat(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      if(result.rows.length) {
        var nbreC = [];
        var chartL = [];
        for (let i = 0; i < result.rows.length; i++) {
          var tmpResult = result.rows[i];
          console.log(tmpResult);
          nbreC.unshift(tmpResult.nbre_cond);
          chartL.unshift(tmpResult.date.toDateString());
          console.log(nbreC);
          console.log(chartL);
        }
        let objJson = {
          "dataCond": nbreC,
          "chartLabels": chartL
        };
      console.log(objJson)
      res.json(objJson);
      } else {
        res.json(false);
      }
    }
  });
});


router.get('/getNbreColisLivrTab', function(req,res) {
  console.log('Request');
  Statistiques.getAllStat(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      if(result.rows.length) {
        var nbreCL = [];
        var chartL = [];
        for (let i = 0; i < result.rows.length; i++) {
          var tmpResult = result.rows[i];
          console.log(tmpResult);
          nbreCL.unshift(tmpResult.nbre_colis_livr);
          chartL.unshift(tmpResult.date.toDateString());
          console.log(nbreCL);
          console.log(chartL);
        }
        let objJson = {
          "dataColisLivr": nbreCL,
          "chartLabels": chartL
        };
      console.log(objJson)
      res.json(objJson);
      } else {
        res.json(false);
      }
    }
  });
});


router.get('/getNbreTrajEffecTab', function(req,res) {
  console.log('Request');
  Statistiques.getAllStat(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      if(result.rows.length) {
        var nbreTE = [];
        var chartL = [];
        for (let i = 0; i < result.rows.length; i++) {
          var tmpResult = result.rows[i];
          console.log(tmpResult);
          nbreTE.unshift(tmpResult.nbre_traj_effec);
          chartL.unshift(tmpResult.date.toDateString());
          console.log(nbreTE);
          console.log(chartL);
        }
        let objJson = {
          "dataTrajEffec": nbreTE,
          "chartLabels": chartL
        };
      console.log(objJson)
      res.json(objJson);
      } else {
        res.json(false);
      }
    }
  });
});


router.get('/getNbreTournEffecTab', function(req,res) {
  console.log('Request');
  Statistiques.getAllStat(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      if(result.rows.length) {
        var nbreToE = [];
        var chartL = [];
        for (let i = 0; i < result.rows.length; i++) {
          var tmpResult = result.rows[i];
          console.log(tmpResult);
          nbreToE.unshift(tmpResult.nbre_tourn_effec);
          chartL.unshift(tmpResult.date.toDateString());
          console.log(nbreToE);
          console.log(chartL);
        }
        let objJson = {
          "dataTournEffec": nbreToE,
          "chartLabels": chartL
        };
      console.log(objJson)
      res.json(objJson);
      } else {
        res.json(false);
      }
    }
  });
});

router.post('/admin-list-ut', function(req,res) {
  User.updateStatutUser(req.body, function(err, result) {
    if (err) {
      res.status(400).json(err);
      console.error(err);
    } else {
      res.json(result);
      console.log(res);
    }
  });

});

router.post('/admin-list-traj', function(req,res) {
  Trajet.updateTraj(req.body, function(err, result) {
    if (err) {
      res.status(400).json(err);
      console.error(err);
    } else {
      res.json(result);
      console.log(res);
    }
  });

});


module.exports = router;

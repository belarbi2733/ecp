let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Tournee = require('../queries/tournee');


/*router.post('/getTourneeByIdUser', function(req,res) {
  Tournee.getDataTournee(1, function(err, result){
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }

    else
    {
      const tmpResult = result.rows[0];
      let objJson = {
        "depart": tmpResult.depart,
        "arrivee": tmpResult.arrivee,
        "nbre_pass": tmpResult.heure_depart
      };
      //console.log(JSON.stringify(objJson)); // On convert en string pour pouvoir l'afficher
      res.json(objJson);
    }
  });
});*/



module.exports = router;

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Statistiques = require('../queries/statistiques');


router.get('/getNbreTournEffecTab', function(req,res) {
  console.log('Request');
  Statistiques.getAllStat(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      if(result.rows.length) {
        let nbreToE = [];
        let chartL = [];
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



module.exports = router;

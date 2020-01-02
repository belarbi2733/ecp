let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Statistiques = require('../queries/statistiques');


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



module.exports = router;

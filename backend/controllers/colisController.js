let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Colis = require('../queries/colis');


//On ajoute un colis, puis on va recup son id qui a été incrémenter pour pouvoir générer le trajet découlant de ce colis

router.post('/add', function (req, res) {
  Colis.addColis(req.body,function(err,result){
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
      console.error(err);
    }
    else {
      Colis.getIdColisByIdUser(req.body, function (err2, result2) {
        console.log(result2.rows[0]);
        if(err2) {
          res.status(400).json(err2);
          console.error(err);
        } else {

          let prixCarb = 1.4;
          let consoVoit = 4.5;
          let distance = req.body.distanceinmeters;

          let prixFinal = prixTraj(prixCarb, consoVoit, distance);
          prixFinal = prixFinal.toFixed(2);
          //console.log(typeof prixFinal);
          //console.log(prixFinal);

          Colis.generateTrajet(req.body, prixFinal,  result2.rows[0].id, function (err3, result3){  //result.rows[0].id ===> idColis
            if(err3) {
              res.status(400).json(err3);
              console.error(err);
            }
            else {
              res.json(result);
            }
          });
        }
      });

    }
  });
});

module.exports = router;


function prixTraj(prixCarburant, consoVoiture, dist) {
  let e = ((dist/1000 * consoVoiture) / 100) * prixCarburant;    // distance est exprime en metre il faut la convertir en km puis prendre la consomation par 100km donc diviser par 100
  console.log('Prix : ' + e + ' € pour le colis');
  return e;
}

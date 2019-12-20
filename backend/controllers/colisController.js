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
      console.log('Erreur add');
    }
    else {
      Colis.getIdColisByIdUser(req.body, function (err2, result2) {
        console.log(result2.rows[0]);
        if(err2) {
          res.status(400).json(err2);
          console.log('Erreur getIdColis');
        } else {
          Colis.generateTrajet(req.body, result2.rows[0].id, function (err3, result3){  //result.rows[0].id ===> idColis
            if(err3) {
              res.status(400).json(err3);
              console.log('Erreur generate');
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

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Trajet = require('../queries/trajet');


//On ajoute un colis, puis on va recup son id qui a été incrémenter pour pouvoir générer le trajet découlant de ce colis

router.post('/add' , function (req, res) {
  Trajet.addTrajet(req.body,function(err,result){
    // console.log(req.body);
    // console.log(result);
    if(err) {
      res.status(400).json(err);
      console.error(err);
    }
    else
    {
      res.json(result);
      
    }
  });
});

module.exports = router;

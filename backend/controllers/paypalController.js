let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Trajet = require('../queries/trajet');

router.post('/getPrix', function(req,res){
  Trajet.getPrice(req.body,function(err,result) {
    if (err) {
      console.log("Erreur dans la récup du prix. Les données de la base de donnée ne sont pas chargées");
      console.error(err);
    } else {
      if(result.rows.length){
        res.json(result.rows[0].prix);
      }
    }
  });
});

router.post('/changeStatus', function(req,res){
  Trajet.changeStatusTraj(4,req.body, function(err,result){
    // console.log(req.body);
    if(err) {
      console.log("Erreur dans le changement de statut");
      console.error(err);
    }
    else {
      console.log(result);
      res.json(result);
    }
  });
});

/*app.get('/paypal', function(req,res){
  User.getPrice(function(err, result) {
*/


module.exports = router;

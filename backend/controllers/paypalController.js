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

router.post('/mon-traj', function(req,res){
  Trajet.getMonTraj(req.body, function(err,result){
    // console.log(req.body);
    if(err) {
      console.log("Erreur dans la recherche de trajet");
      console.error(err);
    }
    else {
      if(result.rows.length) {
        if (result.rows[0].statut==0){statusString="pas encore pris en charge"}
        if (result.rows[0].statut==1){statusString="dans une tournée"}
        if (result.rows[0].statut==2){statusString="effectué"}
        if (result.rows[0].statut==3){statusString="demande de remboursment"}
        if (result.rows[0].statut==4){statusString="payé"}
        if (result.rows[0].statut==5){statusString="remboursé"}
        dateTime = result.rows[0].departure_time.substring(0, 10) + " " + result.rows[0].departure_time.substring(11, 16) ;
        let objJson = {
          id: result.rows[0].id,
          heureDepart: dateTime,
          lieuDepart: result.rows[0].depart_address,
          lieuArrivee: result.rows[0].arrivee_address,
          prix : result.rows[0].prix,
          status : statusString,
          etatStatus : result.rows[0].statut
        }
        console.log(objJson);
        res.json(objJson);
      }
    }
  });
});

router.post('/changeStatus', function(req,res){
  Trajet.changeStatusTraj(4, req.body, function(err,result){
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

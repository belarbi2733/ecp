let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Trajet = require('../queries/trajet');

router.get('/calculPrix', function(req,res){
  Trajet.calcPrixTraj(function(err,result) {
    if (err) {
      console.log("Erreur dans le calcul du prix. Les données de la base de donnée ne sont pas chargées");
      console.error(err);
    } else {
      if (result.rows.length) {
        let prixCarb = 1.4;
        let consoVoit = 4.5;
        //  const tmpResultPrix = result.rows[0];
        /* let distance = tmpResultPrix.distance;
         let bookPlaces = tmpResultPrix.book_places;*/

        /*let distance = 100;*/
        // console.log(result.rows[0]);
        // let distance = new Number (parseInt(result.rows[0],10));
        const tmpResultPrix = result.rows[0];
        let distance = tmpResultPrix.distance;
        let bookPlaces = tmpResultPrix.book_places;
        /*
              console.log(distance);
             console.log(typeof distance);
        */

        function prixTraj(a, b, c, d) {
          let e = ((c * b) / 100) * a;
          console.log('Prix plein : ' + e);
          return discount(e,d);

        }

        console.log('Prix discount : ' + prixTraj(prixCarb, consoVoit, distance, bookPlaces) + " € ");

        function discount(prix, bookPlaces) {
          if(bookPlaces == 0) {
            return prix;
          }
          if (bookPlaces === 1) {
            return prix - ((prix / 100) * 5);
          }
          if (bookPlaces === 2) {
            return prix - ((prix / 100) * 10);
          }
          if (bookPlaces === 3) {
            return prix - ((prix / 100) * 15);
          }
          if (bookPlaces === 4) {
            return prix - ((prix / 100) * 20);
          } else {
            console.log("Erreur trop ou pas assez de clients dans le véhicule");
          }

        }

        let prixfinal = prixTraj(prixCarb, consoVoit, distance, bookPlaces);
        prixfinal = prixfinal.toFixed(2);
        console.log(typeof prixfinal);
        console.log(prixfinal);
        let objJson = {
          "prix": prixfinal
        };
        res.json(objJson);
      } else {
        res.json(false);
      }
    }
  });
});

router.post('/changeStatus', function(req,res){
  Trajet.changeStatusTraj(req.body, function(err,result){
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

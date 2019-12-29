let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Trajet = require('../queries/trajet');


//On ajoute un colis, puis on va recup son id qui a été incrémenter pour pouvoir générer le trajet découlant de ce colis

router.post('/add' , function (req, res) {

  console.log(req.body);

  let prixCarb = 1.4;
  let consoVoit = 6.5;
  let distance = req.body.distanceinmeters;
  let bookPlaces = req.body.places;

  let prixFinalParPersonne = prixTraj(prixCarb, consoVoit, distance, bookPlaces);
  console.log('Prix discount : ' + prixFinalParPersonne + " € par personne");
  let prixFinal = (prixFinalParPersonne*bookPlaces).toFixed(2); //
  //console.log(typeof prixFinal);
  //console.log(prixFinal);

  Trajet.addTrajet(req.body, prixFinal,function(err,result){
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


function discount(prix, bookPlaces) {

  if(bookPlaces >= 0 && bookPlaces <= 7) {
    return prix - ((prix/100)*5*(bookPlaces-1));

    // bookPlaces = 0 => 0% de réduction
    // bookPlaces = 1 => 5% de réduction
    // bookPlaces = 2 => 10% de réduction
    // bookPlaces = 3 => 15% de réduction
  } else {
    console.log("Erreur trop ou pas assez de clients dans le véhicule");
  }
}

function prixTraj(prixCarburant, consoVoiture, dist, places) {
  let e = ((dist/1000 * consoVoiture) / 100) * prixCarburant;    // distance est exprime en metre il faut la convertir en km puis prendre la consomation par 100km donc diviser par 100
  console.log('Prix plein : ' + e + ' € par personne');
  return discount(e,places);
}

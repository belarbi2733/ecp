let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let User = require('../queries/user');
let Trajet = require('../queries/trajet');
let Colis = require('../queries/colis');


router.get('/list-traj', function(req,res){
  Trajet.getAllTrajets(function(err,result){
    if(err) {
      console.log("Erreur dans getAllTrajets query");
      console.error(err);
    }

    else {
      console.log(" getAllTrajets query effectuée");
      let arrayTraj = [];
      let colisName = "";
      let places= "";
      let timeDate="";
      // let paypalAccount="";
      for (let i = 0; i < result.rows.length ; i++ )
      {
        if(result.rows[i].book_places){
          places = result.rows[i].book_places;
        }
        else {
          places = "Livraison de colis" ;
        }

        timeDate = result.rows[i].departure_time.substring(0, 10) + " " + result.rows[i].departure_time.substring(11, 16) ;


        arrayTraj.push({
          id: result.rows[i].id,
          depart : result.rows[i].depart_address,
          time : timeDate,
          nbrePlaces : places,
          prix : result.rows[i].prix,
          paypal : result.rows[i].paypal,
          paypalcond : result.rows[i].paypalcond,
          statut : result.rows[i].statut
        });
      }
      console.log(arrayTraj);
      res.json(arrayTraj);

    }
  });
});


router.get('/list-ut', function(req,res) {
  User.getAllUser(function(err, result) {
    if(err) {
      res.status(400).json(err);
      console.error(err);
    }
    else {
      let arrayUser = [];
      for (let i = 0; i < result.rows.length ; i++ )
      {

        arrayUser.push({
          id: result.rows[i].id,
          nom : result.rows[i].nom,
          prenom : result.rows[i].prenom,
          statut : result.rows[i].statut,
          mail: result.rows[i].mail

        });
      }
      // console.log(arrayUser);
      res.json(arrayUser);


    }
  });
});






/*app.post('/list-traj', function (req,res) {
  Trajet.getTrajetById(req.body.idUser, function(err,result){
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
      console.error(err);
    }
    else
    {
      const dispResult = result.rows[0];

      let trajObjJson = {
        "depart": 'Mons',
        "arrivee": 'Tournai',
        "nbre_places": 3,
        "id": 1,

      }; // création du fichier JSon
      console.log(JSON.stringify(trajObjJson));
      res.json(trajObjJson);
    }
  });
  });*/

/*app.get('/dashBoard/getNbreUsers', function(req,res) {
  console.log('Request');
  User.getAllUser(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
      console.error(err);
    } else {
      res.json(result.rows.length);
    }
  });
});*/
/*--------------------------------------------------------------------------------------------------------------- */



module.exports = router;

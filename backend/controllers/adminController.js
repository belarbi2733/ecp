let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let User = require('../queries/user');
let Trajet = require('../queries/trajet');


router.get('/list-traj', function(req,res){
  Trajet.getTrajetById(function(err,result){
    if(err) {
      // console.log("Erreur dans getTrajetById");
      console.error(err);
    }

    else {
      let arrayUser = [];
      const tmpResultTrajUser = result.rows[0];
      for (let i = 0; i < result.rows.length ; i++ )
      {

        arrayUser.push({
          id: result.rows[i].id,
          depart : result.rows[i].depart_address,
          arrivee : result.rows[i].arrivee_address,
          nbrePlaces : result.rows[i].book_places
        });
      }
      console.log(arrayUser);
      res.json(arrayUser);

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
      const tmpResultUser = result.rows[0];
      for (let i = 0; i < result.rows.length ; i++ )
      {

        arrayUser.push({
          id: result.rows[i].id,
          nom : result.rows[i].nom,
          prenom : result.rows[i].prenom
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

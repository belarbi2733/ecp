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
      if(result.rows.length) {
      
        Trajet.getpaypalCond(function(err2,result2){
          if(err2) {
            console.log("Erreur dans getPaypalCond query");
            console.error(err2);
          }
      
          else {

            console.log(" get PaypalCond query effectuée");
 
            let arrayTraj = [];
            let colisName = "";
            let places= "";
            let timeDate="";
            let paypalConducteur="";
            // let paypalAccount="";
            for (let i = 0; i < result.rows.length ; i++ )
            {
              for (let j = 0; j < result2.rows.length ; j++ )
              { 
                if(result.rows[i].id==result2.rows[j].id){
                  paypalConducteur = result2.rows[j].paypalcond ;
                }
              }

              if(paypalConducteur==""){
                paypalConducteur = "N\A";
              }
              
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
                paypalcond : paypalConducteur,
                statut : result.rows[i].statut
              });
            }
            console.log(arrayTraj);
            res.json(arrayTraj);

          }
        });
      }
      else{res.json(null);}
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

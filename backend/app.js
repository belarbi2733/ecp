let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let User = require('./user');
let Colis = require('./colis');
let Trajet = require('./trajet');
let Voiture = require('./voiture');
let Tournee = require('./tournee');
const nodemailer = require('nodemailer');
const cors = require('cors');
let _ = require('underscore');
let Math = require('mathjs');
let Python = require('./algoRun/processes');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

// !!!!!!!!!! Il faut mettre votre mdp de votre database dans db.js sinon ca fonctionne pas

/*Index :
1 : Inscription
2 : CheckPassword
3 : getId
4: addColis
5: addtrajet
6: mes-tourn
7: personalData/getDataUser
8: personalData/update
9: admin-list-traj
10: adminListUt
11: calcPrixTraj
*/


/*-------------------------1------------------------------------------------------------------------------------ */


app.post('/inscription',function (req, res) {
    User.addUtilisateur(req,function(err,result){
    // console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      res.json(result);
    }
  });
});

/*--------------------------2------------------------------------------------------------------------------------- */


app.post('/auth/checkPassword', function (req,res) {
  User.checkPasswordByMail(req.body, function (err, result) {
    // console.log(req.body);
    console.log('err : ' + err);
    if (err) {
      res.status(400).json(err);
      console.log("Erreur in checkPassword");
    } else {
      if(result.rows.length !== 0) { // Check si il y a le mail dans la database
        if (result.rows[0].password === req.body.password) { //Check si les mots de passes correspondent
          res.json(true);
        }
        else {
          res.json(false); // Le cas où les mots de passe ne correspondent pas
          console.log(false);
        }
      }
      else {
        res.json(false); // Le cas où le mail n'a pas été trouvé dans la database (result est vide)
        console.log(false);
      }
    }
  });
});

/*--------------------------3------------------------------------------------------------------------------------- */


app.post('/auth/getId', function (req,res) {
  console.log('getAuth : ' + req.body.mail);
  User.getIdUtilisateurByMail(req.body.mail, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log("Erreur in getId");
    }
    else {
      if(result.rows.length !== 0) {
        console.log("getId Ok : " + result.rows[0].id);
        res.json(result.rows[0].id);
      }
    }
  })
});

/*----------------------------4----------------------------------------------------------------------------------- */

//On ajoute un colis, puis on va recup son id qui a été incrémenter pour pouvoir générer le trajet découlant de ce colis

app.post('/addColis', function (req, res) {
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

/*---------------------------5------------------------------------------------------------------------------------ */


app.post('/addtrajet' , function (req, res) {
  Trajet.addTrajet(req.body,function(err,result){
    console.log(req.body);
    console.log(result);
    if(err) {
      res.status(400).json(err);
      console.log(err);
    }
    else
    {
      res.json(result);
    }
  });
});

/* Création de la requête post pour les infos des tournées de l user */
/*----------------------------6----------------------------------------------------------------------------------- */
app.post('/mes-tourn', function(req,res) {
  Tournee.getDataTournee(1, function(err, result){
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }

    else
    {
      const tmpResult2 = result.rows[0];
      let objJson2 = {
        "depart": tmpResult2.depart,
        "arrivee": tmpResult2.arrivee,
        "nbre_pass": tmpResult2.heure_depart
      };
      //console.log(JSON.stringify(objJson)); // On convert en string pour pouvoir l'afficher
      res.json(objJson2);
    }
  });
});

/*----------------------------7----------------------------------------------------------------------------------- */

app.post('/personalData/getDataUser', function(req,res) {
  User.getDataById(req.body.idUser, function(err, result) {
    // console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      const tmpResult = result.rows[0];
      //console.log(result.rows[0]);
      let objJson = {      // Je crée cet objet objJson pour restructurer les variables de result.rows et aussi pour éviter d'envoyer des données sensibles contenu dans result.rows comme le mot de passe
          "nom": tmpResult.nom,
          "prenom": tmpResult.prenom,
          "tel": tmpResult.telephone,
          "mail": tmpResult.mail,
          "sexe": tmpResult.sexe,
          "date_naiss": tmpResult.date_naiss,
          "description": tmpResult.descr
      };
      //console.log(JSON.stringify(objJson));
      res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
    }
  });
});

/*-----------------------------8-------------------------------------------------------------------------------- */

app.post('/personalData/update',function (req,res) {
  // console.log(req.body);
  User.updateUtilisateur(req.body,function (err,result) {
    if(err) {
      res.status(400).json(err);
    }
    else {
      // console.log(result);
      res.json(result);
    }
  });
});

app.post('/deleteAccount', function (req,res) {
  // console.log(req.body);
  User.removeUtilisateur(req.body.idUser, function (err,result) {
    if(err) {
      res.status(400).json(err);
    }
    else {
      // console.log(result);
      res.json(result);
    }
  });
});

app.post('/pref/update' , function (req,res) {
  // console.log(req.body);
  // console.log(req.body.idUser);
  User.updateUtilisateurPref(req.body, function (err, result) {
    if(err) {
      res.status(400).json(err);
    }
    else {
      // console.log(result);
      res.json(result);
    }
  })
});

app.post('/pref/getPref' , function (req,res) {
  console.log(req.body);
  User.getDataById(req.body.idUser, function(err, result) {
    // console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      const tmpResult = result.rows[0];
      // console.log(result.rows[0]);
      let objJson = {      // Je crée cet objet objJson pour restructurer les variables de result.rows et aussi pour éviter d'envoyer des données sensibles contenu dans result.rows comme le mot de passe
        "prefAnimaux": tmpResult.pref_animaux,
        "prefFumer": tmpResult.pref_fumer,
      };
      //console.log(JSON.stringify(objJson));
      res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
    }
  });
});

app.post('/rating' , function (req,res) {
  console.log(req.body);
  User.getDataById(req.body.idUser, function(err, result) {
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      const userData = result.rows[0];
      console.log(result.rows[0]);
      let newNote = 3;
      let avrRating = userData.avr_rating;
      let nbrratings = userData.nbr_ratings;

      let newRating = ((avrRating*nbrratings)+newNote)/(nbrratings+1);

      newRating = newRating.toFixed(2);

      res.json(newRating);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
    }
  });
});


/*-----------------------------9---------------------------------------------------------------------------------- */

app.get('/admin-list-traj', function(req,res){
  Trajet.getTrajetById(function(err,result){
    if(err) {
      console.log("Erreur dans getTrajetById");
    }

    else {
      const tmpResultUser2 = result.rows[0];
    /*  let trajObjJson = {
        "depart": tmpResultUser2.depart,
        "arrivee": tmpResultUser2.arrivee,
        "nbre_places": tmpResultUser2.nbre_places,
        "id": tmpResultUser2.id_user
      };*/
      //console.log(JSON.stringify(result.rows[0]));
      res.json(result.rows[0]);
    }
  });
});

/*-----------------------------------10---------------------------------------------------------------------------- */

app.get('/admin-list-ut', function(req,res) {
  User.getAllUser(function(err, result) {
    if(err) {
      res.status(400).json(err);
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
      console.log(arrayUser);
      res.json(arrayUser);


    }
  });
});

/*-----------------------------------11---------------------------------------------------------------------------- */


app.get('/paypal', function(req,res){
   Trajet.calcPrixTraj(function(err,result){
    if(err) {
      console.log("Erreur dans le calcul du prix. Les données de la base de donnée ne sont pas chargées");
    }

    else {
    }
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
    });
  });

  /*-----------------------------------11---------------------------------------------------------------------------- */


  app.post('/paypalStatus', function(req,res){
    Trajet.changeStatusTraj(req.body, function(err,result){
      console.log(req.body);
      if(err) {
        console.log("Erreur dans le changement de statut");
      }
      else {
      console.log(result);
      res.json(result);
    }
    });
  });

/*-----------------------------------11---------------------------------------------------------------------------- */
/*app.get('/paypal', function(req,res){
  User.getPrice(function(err, result) {


app.post('/vehicule/update', function(req,res) {
  console.log(req.body);
  Voiture.addVoiture(req.body,function(err,result) {
    if(err) {
      res.status(400).json(err);
    }
    else {
      console.log(result);
      res.json(result);
    }
  })
});

app.post('/vehicule/getData' , function (req,res) {
  // console.log(req.body);
  Voiture.getDataVoitureById(req.body.idUser, function(err, result) {
    // console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      if(result.rows.length) {
        const tmpResult = result.rows[0];
        let objJson = {      // Je crée cet objet objJson pour restructurer les variables de result.rows et aussi pour éviter d'envoyer des données sensibles contenu dans result.rows comme le mot de passe
          "marque": tmpResult.nom_marque,
          "modele": tmpResult.nom_modele,
          "sieges": tmpResult.nbre_places,
          "volumeCoffre": tmpResult.coffre,

        };
        console.log(JSON.stringify(objJson));
        res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
      }
      else {
        res.json(null); // Renvoie null si ok avec la database mais aucune voiture n'a ete trouve pour l'user
      }
    }
  });
});


/*app.post('/admin-list-traj', function (req,res) {
  Trajet.getTrajetById(req.body.idUser, function(err,result){
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
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

/*app.get('/adminDashBoard/getNbreUsers', function(req,res) {
  console.log('Request');
  User.getAllUser(function (err, result) {
    console.log(result);
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(result.rows.length);
    }
  });
});*/
/*--------------------------------------------------------------------------------------------------------------- */

app.post('/matchDriverTrajet', function(req,res) {
  console.log(req.body);
  Voiture.getDataVoitureById(req.body.idUser, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log('Error 1');
      console.log(err);
    } else {
      if(result.rows.length) {
        Trajet.getAllTrajet(function (err2,result2) {
          if(err2) {
            res.status(400).json(err2);
            console.log('Error 2');
          }
          else
          {
            if(result2.rows.length) {
              const search = req.body;
              let arrayTrajet = {"chauffeur":[result.rows[0].nbre_places-1,search.departure[1],search.departure[0],search.arrival[1],search.arrival[0]]};
              let arrayColis = {"chauffeur":[result.rows[0].coffre,search.departure[1],search.departure[0],search.arrival[1],search.arrival[0]]};

              let colisJson = {};
              let trajetJson = {};
              let i = 0;
              let j = 0;
              let jsonKeyColis = 'chauffeur';
              let jsonKeyTrajet = 'chauffeur';

              colisJson[jsonKeyColis] = [
                search.idUser,
                result.rows[0].coffre,
                search.detourMax,
                search.departure[1],
                search.departure[0],
                search.arrival[1],
                search.arrival[0]
              ];
              i++;

              trajetJson[jsonKeyTrajet] = [
                search.idUser,
                search.nbrePlaces,
                search.detourMax,
                search.departure[1],
                search.departure[0],
                search.arrival[1],
                search.arrival[0],
                result.rows[0].coffre,
              ];
              j++;

              /*let arrayColis = [{
                idChauffeur: search.idUser,
                volume: result.rows[0].coffre,
                detourMax: req.body.detourMax,
                latDepart: search.departure[1],
                longDepart: search.departure[0],
                latArrivee: search.arrival[1],
                longArrivee: search.arrival[0]
              }];

              let arrayTrajet = [{
                idChauffeur: search.idUser,
                places: search.nbrePlaces,
                detourMax: search.detourMax,
                latDepart: search.departure[1],
                longDepart: search.departure[0],
                latArrivee: search.arrival[1],
                longArrivee: search.arrival[0],
                coffre: result.rows[0].coffre
              }];*/

              Colis.getAllColis(function (err3, result3) {
                if (err3) {
                  res.status(400).json(err3);
                  console.log('Error 3 on Mini Trajet');
                  console.log(err3);
                  return -1;
                } else {
                  _.each(result2.rows, function (one) { // bibliothèque underscore _     //Pour chaque trajet, check

                    Trajet.findTrajetAroundRayon(req.body, one, 10, function (err4, result4) {  //req.body => search
                      if (err4) {
                        res.status(400).json(err4);
                        console.log('Error 4 on Find Trajet');
                        console.log(err4);
                        return -1;
                      } else {
                        if (result4.rows.length) {

                          let dist = distance(req.body.departure[1],req.body.departure[0],one.depart_y,one.depart_x);

                          if(one.id_colis) {
                            //Séquence si c'est un colis
                            jsonKeyColis = 'colis' + i;

                            colisJson[jsonKeyColis] = [
                              one.id_colis,
                              dist,
                              result3.rows[one.id_colis-1].volume,  // On va chercher le volume de l'id_colis correspondant
                              one.prix,
                              one.depart_y,
                              one.depart_x,
                              one.arrivee_y,
                              one.arrivee_x
                            ];
                            i++;

                            /*arrayColis.push({
                              idColis: one.id_colis,
                              distance: dist,
                              volume: result3.rows[one.id_colis-1].volume,  // On va chercher le volume de l'id_colis correspondant
                              prix: one.prix,
                              latDepart: one.depart_y,
                              longDepart: one.depart_x,
                              latArrivee: one.arrivee_y,
                              longArrivee: one.arrivee_x
                            });*/
                            //console.log(JSON.stringify(arrayColis));
                            //console.log('Colis : ' + one.id_colis + ' id : ' + one.id);

                          } else {
                            //Séquence si c'est un trajet

                            jsonKeyTrajet = 'trajet' + j;

                            trajetJson[jsonKeyTrajet] = [
                              one.id,
                              dist,
                              1,
                              one.prix,
                              one.depart_y,
                              one.depart_x,
                              one.arrivee_y,
                              one.arrivee_x,
                              0
                            ];
                            j++;

                            /*arrayTrajet.push({
                              idTrajet: one.id,
                              distance: dist,
                              volume: 1,
                              prix: one.prix,
                              latDepart: one.depart_y,
                              longDepart: one.depart_x,
                              latArrivee: one.arrivee_y,
                              longArrivee: one.arrivee_x,
                              volumeBagage: 0
                            });*/
                            // console.log(JSON.stringify(arrayTrajet));
                            //console.log('Trajet : ' + one.id);
                          }
                        }
                      }
                      //console.log('Colis' + JSON.stringify(arrayColis));
                      //console.log('Trajet' + JSON.stringify(arrayTrajet));
                      //const objJson = arrayColis + arrayTrajet;
                      console.log('Colis' + JSON.stringify(colisJson));
                      console.log('Trajet' + JSON.stringify(trajetJson));
                      Python.runPy(colisJson);
                    });
                  });
                }
              });
            }
            else {
              res.json(null);
            }
          }
        });
      } else {
        res.json(false);
        console.log('pas de voiture');
      }
    }
  });
});

app.post('/miniTrajet', function(req,res) {

  console.log(req.body);
  Voiture.getDataVoitureById(req.body.idUser, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log('Error 1 on Mini Trajet');
    } else {
      if(result.rows.length) {
        Trajet.getAllTrajet(function (err2,result2) {
          if(err2) {
            res.status(400).json(err2);
            console.log('Error 2 on Mini Trajet');
          }
          else
          {
            if(result2.rows.length) {
              const search = req.body;

              let arrayMiniColis = [{
                idChauffeur: req.body.idUser,
                places: result.rows[0].coffre,
                latDepart: search.departure[1],
                longDepart: search.departure[0],
                latArrivee: search.arrival[1],
                longArrivee: search.arrival[0]
              }];

              let arrayMiniTrajet = [{
                idChauffeur: req.body.idUser,
                places: search.nbrePlaces,
                latDepart: search.departure[1],
                longDepart: search.departure[0],
                latArrivee: search.arrival[1],
                longArrivee: search.arrival[0]
              }];


              Colis.getAllColis(function (err3, result3) {
                if (err3) {
                  res.status(400).json(err3);
                  console.log('Error 3 on Mini Trajet');
                  console.log(err3);
                  return -1;
                } else {
                  _.each(result2.rows, function(one) { // bibliothèque underscore _     //Pour chaque trajet, check

                    Trajet.findMiniTrajet(req.body,one,100, function (err4, result4) {  //req.body => search
                      if(err4) {
                        res.status(400).json(err4);
                        console.log('Error 4 on Mini Trajet');
                        console.log(err4);
                        return -1;
                      }
                      else {
                        if (result4.rows.length) {

                      let dist = distance(req.body.departure[1],req.body.departure[0],one.depart_y,one.depart_x);
                      // console.log(dist);

                          if(one.id_colis) {
                            //Séquence si c'est un colis
                            arrayMiniColis.push({
                              idColis: one.id_colis,
                              distance: dist,
                              volume: result3.rows[one.id_colis-1].volume,  // On va chercher le volume de l'id_colis correspondant
                              prix: one.prix,
                              latDepart: one.depart_y,
                              longDepart: one.depart_x,
                              latArrivee: one.arrivee_y,
                              longArrivee: one.arrivee_x
                            });
                            //console.log(JSON.stringify(arrayMiniColis));
                            //console.log('Mini Colis : ' + one.id_colis + ' id : ' + one.id);

                          } else {
                            //Séquence si c'est un trajet
                            arrayMiniTrajet.push({
                              idTrajet: one.id,
                              distance: dist,
                              volume: 1,
                              prix: one.prix,
                              latDepart: one.depart_y,
                              longDepart: one.depart_x,
                              latArrivee: one.arrivee_y,
                              longArrivee: one.arrivee_x
                            });
                            // console.log(JSON.stringify(arrayMiniTrajet));
                            //console.log('Mini Trajet : ' + one.id);
                          }
                        }
                      }

                      //console.log('Mini Colis' + JSON.stringify(arrayMiniColis));
                      //console.log('Mini Trajet' + JSON.stringify(arrayMiniTrajet));
                      const objJsonMini = arrayMiniColis + arrayMiniTrajet;

                    });
                  });
                }
              });
            }
            else {
              res.json(null);
            }
          }
        });
      } else {
        res.json(false);
      }
    }
  });
});

//Script nodemailer
app.use(cors({origin: "*"}));
app.use(bodyParser.json({type : '*/*'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.get('/sendmail/contact', (req, res) => {
    let subject = req.query['subject'];
    let mail = req.query['mail'];
    let content = req.query['content'];
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Sujet: ${subject}</li>
        <li>Email: ${mail}</li>
      </ul>
      <h3>Message :</h3>
      <p>${content}</p>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        //SMTP SERVER INFO
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e005c016d0db91",
          pass: "5e24274bd11a0a"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'farid-f33@live.be', // sender address
      to: 'farid-f32@msn.com', // list of receivers
      subject: req.params.subject, // Subject line
      text: 'Nouvelle demande de contacte reçue :', // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }else{
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          res.send(output);
        }

    });
});

module.exports = app;
port = 8081;
app.listen(port, ()=>{
    console.log("Server started, listening to "+ port + " port");
});


// var server = http.createServer(function(req, res) {
//     var page = url.parse(req.url).pathname;
//     console.log(page);
//     res.writeHead(200);
//
//
//     if(page == '/'){
//         res.write(hello.hello(req));
//     }
//     else{
//         res.write('not found')
//     }
//     res.end();
// });



// Source : https://www.1formatik.com/2417/comment-calculer-distance-latitude-longitude-javascript
function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    let radlat1 = Math.pi * lat1/180;
    let radlat2 = Math.pi * lat2/180;
    let theta = lon1-lon2;
    let radtheta = Math.pi * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.pi;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }
}

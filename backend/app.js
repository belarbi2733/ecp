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


app.post('/addColis', function (req, res) {
  Colis.addColis(req.body,function(err,result){
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
      console.log('Erreur add');
    }
    else {
      Colis.generateTrajet(req.body, req.body.depart, req.body.arrivee, function (err2, result2){
        if(err2) {
          res.status(400).json(err2);
          console.log('Erreur generate');
        }
        else {
          res.json(result);
        }
      });
    }
  });
});

/*---------------------------5------------------------------------------------------------------------------------ */


app.post('/addtrajet' , function (req, res) {
  Trajet.addTrajet(req, function(err,result) {
    // console.log(req.body);
    console.log(result);
    if(err) {
      res.status(400).json(err);
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
      res.json(objJson);
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
  // console.log(req.body);
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
      const tmpResult = result.rows[0];
      console.log(result.rows[0]);
      let objJson = {      // Je crée cet objet objJson pour restructurer les variables de result.rows et aussi pour éviter d'envoyer des données sensibles contenu dans result.rows comme le mot de passe
        "currentRate": tmpResult.note,
      };
      //console.log(JSON.stringify(objJson));
      res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
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
      const tmpResultUser = result.rows[0];
      console.log(result.rows);
      /*let objJson = {
        "nom": tmpResultUser.nom,
        "prenom": tmpResultUser.prenom,
        "id": tmpResultUser.id
      };*/

      res.json(result.rows);
     // console.log(result.rowCount);
     /* console.log(result.row);*/
     /* for(let i=0; i < result.rowCount ; i++)
      {
      const tmpResultUser = result.rows[0];
      //console.log(result.rows[0]);
      let objJson = {
        "nom": tmpResultUser.nom,
        "prenom": tmpResultUser.prenom,
        "id": tmpResultUser.id
      };

      }*/
      //console.log(JSON.stringify(objJson)); // On convert en string pour pouvoir l'afficher
     /* res.json(objJson);*/
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
     let objJson = {
       "prix": prixfinal
     };
     res.json(objJson);
    });
  });

/*-----------------------------------11---------------------------------------------------------------------------- */
/*app.get('/paypal', function(req,res){
  User.getPrice(function(err, result) {
    if (err) {
      res.status(400).json(err);
    } else {
      console.log(result.rows[1]);
      const tmpResultprice = result.rows[1];
      //console.log(result.rows[0]);
      let objJson = {
        "prix": tmpResultprice.prix
      };
      res.json(objJson);
    }
  });
});*/

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
      const tmpResult = result.rows[0];
      // console.log(result.rows[0]);
      let objJson = {      // Je crée cet objet objJson pour restructurer les variables de result.rows et aussi pour éviter d'envoyer des données sensibles contenu dans result.rows comme le mot de passe
        "marque": tmpResult.nom_marque,
        "modele": tmpResult.nom_modele,
        "sieges": tmpResult.nbre_places,
        "volumeCoffre": tmpResult.coffre,

      };
      console.log(JSON.stringify(objJson));
      res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
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

/*--------------------------------------------------------------------------------------------------------------- */


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

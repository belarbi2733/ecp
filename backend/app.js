let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let User = require('./user');
let Colis = require('./colis');
let Trajet = require('./trajet');
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
9: admin-list-traj*/

/*-------------------------1------------------------------------------------------------------------------------ */


app.post('/inscription',function (req, res) {
  User.addUtilisateur(req,function(err,result){
    console.log(req.body);
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
    console.log(req.body);
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
  Trajet.addTrajet(req.body,function(err,result){
    console.log(req.body);
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
      console.log(JSON.stringify(objJson)); // On convert en string pour pouvoir l'afficher
      res.json(objJson);
    }
  });


});

/*----------------------------7----------------------------------------------------------------------------------- */

app.post('/personalData/getDataUser', function(req,res) {
  User.getDataById(req.body.idUser, function(err, result) {
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      const tmpResult = result.rows[0];
      //console.log(result.rows[0]);
      let objJson = {
          "nom": tmpResult.nom,
          "prenom": tmpResult.prenom,
          "tel": tmpResult.telephone,
          "mail": tmpResult.mail,
          "sexe": tmpResult.sexe,
          "date_naiss": tmpResult.date_naiss,
          "description": tmpResult.descr
      };
      console.log(JSON.stringify(objJson)); // On convert en string pour pouvoir l'afficher
      res.json(objJson);
    }
  });
});

/*-----------------------------8-------------------------------------------------------------------------------- */

app.post('/personalData/update',function (req,res) {
  console.log(req.body);
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
      console.log(JSON.stringify(result.rows[0]));
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
    else
    {
      const tmpResultUser = result.rows[0];
      //console.log(result.rows[0]);
      let objJson = {
        "nom": tmpResultUser.nom,
        "prenom": tmpResultUSer.prenom,
        "nbre_traj": tmpResult.status
      };
      console.log(JSON.stringify(objJson)); // On convert en string pour pouvoir l'afficher
      res.json(objJson);
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
      service : "hotmail", // true for 465, false for other ports
      auth: {
          user: 'YOUR-E-MAIL', // generated ethereal user
          pass: 'YOUR-PASSWORD'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized : false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'mail@sender.com', // sender address
        to: 'mail@reciever.com', // list of receivers
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
app.listen(8080, ()=>{
    console.log("Server started, listening to 8080 port");
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

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let User = require('./user');
let Colis = require('./colis');
let Trajet = require('./trajet');
let ModeleVoiture = require('./modeleVoiture');
let Voiture = require('./voiture');
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

app.post('/auth/getId', function (req,res) {
  // console.log('getAuth : ' + req.body.mail);
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


app.post('/addColis', function (req, res) {
  Colis.addColis(req.body,function(err,result){
    // console.log(req.body);
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

app.post('/addtrajet' , function (req, res) {
  Trajet.addTrajet(req.body,function(err,result){
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
      console.log(JSON.stringify(objJson));
      res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
    }
  });
});

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
  console.log(req.body);
  console.log(req.body.idUser);
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
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      const tmpResult = result.rows[0];
      console.log(result.rows[0]);
      let objJson = {      // Je crée cet objet objJson pour restructurer les variables de result.rows et aussi pour éviter d'envoyer des données sensibles contenu dans result.rows comme le mot de passe
        "prefAnimaux": tmpResult.pref_Animaux,
        "prefFumer": tmpResult.pref_Fumer,
      };
      console.log(JSON.stringify(objJson));
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
      console.log(JSON.stringify(objJson));
      res.json(objJson);  // on peut renvoyer result.rows[0] aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
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

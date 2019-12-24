let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let User = require('../queries/user');

router.post('/personalData/getDataUser', function(req,res) {
  User.getDataById(req.body.idUser, function(err, result) {
    // console.log(req.body);
    if(err) {
      res.status(400).json(err);
      console.log(err);
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

router.post('/personalData/update',function (req,res) {
  // console.log(req.body);
  User.updateUtilisateur(req.body,function (err,result) {
    if(err) {
      res.status(400).json(err);
      console.log(err);
    }
    else {
      console.log(result);
      res.json(result);
    }
  });
});

router.post('/deleteAccount', function (req,res) {
  console.log(req.body);
  User.removeUtilisateur(req.body.idUser, function (err,result) {
    if(err) {
      res.status(400).json(err);
      console.log(err);
    }
    else {
      // console.log(result);
      res.json(result);
    }
  });
});

router.post('/pref/update' , function (req,res) {
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

router.post('/pref/getPref' , function (req,res) {
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

router.post('/rating' , function (req,res) {
  User.getDataById(req.body.idUser, function(err, result) {
    if(err) {
      res.status(400).json(err);
      console.log(err);
    }
    else
    {
      let userData = result.rows[0];
      let newNote = 2.5; /* Instance new note from mobile app*/
      let avrRating = userData.avr_rating;
      let nbrRatings = userData.nbr_ratings;

      let newRating = ((avrRating*nbrRatings)+newNote)/(nbrRatings+1);

      newRating = newRating.toFixed(1); /* Round the result to 2 decimal */
      userData.avr_rating = newRating;
      userData.nbr_ratings = nbrRatings + 1;
      console.log(result.rows[0]);
      User.updateUtilisateur(userData, function(err2, result2) {
        if(err2) {
          res.status(400).json(err2);
        } else {
          res.json(newRating);  // on peut renvoyer userData aussi mais il y a un conflit de variables du coup on les change avec un nouvel objet
        }
      });
    }
  });
});


//////////////////////////////////////////     13 file upload profile pic   /////////////////////////////////////////////////////
// const express = require('express'), // deja déclaré plus haut
path = require('path'),
cors = require('cors'), // deja déclaré
multer = require('multer'),
bodyParser = require('body-parser');

// File upload settings
const PATH = './uploads';
var path = require('path')
let storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, PATH);
},
filename: (req, file, cb) => {

  cb(null,Date.now() + path.extname(file.originalname) )

}

});

let upload = multer({
storage: storage
});



// Express settings
// const app = express(); // deja déclaré plus haut
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
extended: false
}));

router.get('/', function (req, res) {
res.end('File catcher');
});

// POST File
router.post('/upload', upload.single('image'), function (req, res) {
if (!req.file) {
  console.log("No file is available!");
  return res.send({
    success: false
  });

} else {
  console.log('File is available!');
  let pathPhoto=req.file.filename;
  let idUser= req.body.id;
  console.log("idUser  ");
  console.log(idUser);
  // User.addPhoto(req.body.idUser, pathPhoto, function(err,result){
    User.addPhoto(pathPhoto, idUser, function(err,result){
    // console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      return res.send({
        success: true
      })
    }
  })

}

});

// Create PORT, deja fait à la fin du fichier
// const PORT = process.env.PORT || 8080;
// const server = app.listen(PORT, () => {
//   console.log('Connected to port ' + PORT)
// })

// Find 404 and hand over to error handler
router.use((req, res, next) => {
next(createError(404));
});

// error handler
router.use(function (err, req, res, next) {
console.error(err.message);
if (!err.statusCode) err.statusCode = 500;
res.status(err.statusCode).send(err.message);
});
//////////////////////////////////////fin du code file upload////////////////////////////////////////////////////////////



module.exports = router;

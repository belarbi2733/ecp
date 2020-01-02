let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let User = require('../queries/user');
let bcrypt = require('bcryptjs');
const saltRounds = 12; // +1 -> 2 fois plus long de brute force le hash, minimum 12 en production


router.post('/inscription', function (req, res) {

  bcrypt.hash(req.body.mot_passe, saltRounds, function (err,   hash) {
    User.addUtilisateur(req,hash,function(err,rows){
      if(err) {
        res.status(400).json(err);
        console.error(err);
      }
      else
      {
        res.json(rows);
      }
    });
  });
});

router.post('/checkPassword', function (req,res) {
  User.checkPasswordByMail(req.body, function (err, result) {
    // console.log(req.body);
    if (err) {
      res.status(400).json(err);
      console.error(err);
    } else {
      if(result.rows.length !== 0) { // Check si il y a le mail dans la database

        if (result.rows[0].statut > 0) { //Check le statut de l'utilisateur
          
          let match =bcrypt.compareSync(req.body.password, result.rows[0].password); // compare les hash 
         
          if(match) {
            res.json(true); 
            console.log("Mot de passe correct");
          }

          else {
            res.json(false); 
            console.log("Mot de passe incorrect");
          }
        }
        else {
          res.json(false); 
          console.log("Compte désactivé, vérifiez vos mails!");
        }
      }
      else {
        res.json(false); // Le cas où le mail n'a pas été trouvé dans la database (result est vide)
        console.log("mail incorrect");
      }
    }
  });
});

router.post('/checkAdmin', function (req,res) {
  User.checkPasswordByMail(req.body, function (err, result) {
    // console.log(req.body);
    if (err) {
      res.status(400).json(err);
      console.error(err);
    } else {
      if(result.rows.length !== 0) { // Check si il y a le mail dans la database
        if (result.rows[0].statut===2) { //Check si les mots de passes correspondent et le statut de l'utilisateur
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

router.post('/inscriptionLien', function(req,res){
  User.changeStatusUser(req.body, function(err,result){
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

router.post('/getId', function (req,res) {
  console.log('getAuth : ' + req.body.mail);
  User.getIdUtilisateurByMail(req.body.mail, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.error(err);
    }
    else {
      if(result.rows.length !== 0) {
        console.log("getId Ok : " + result.rows[0].id);
        res.json(result.rows[0].id);
      }
    }
  })
});

module.exports = router;

let express = require('express');
let app = express();
let User = require('./user');
let bodyParser = require('body-parser');
let Colis = require('./colis');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/inscription', function (req, res) {
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

app.post('/auth', function (req,res) {
  User.getUtilisateur(req, function (err, result) {
    console.log(req.body);
    console.log('err : ' + err);
    if (err) {
      res.status(400).json(err);
      console.log("Erreur");
    } else {
      if(result.rows.length !== 0) { // Check si il y a le mail dans la database
        if (result.rows[0].password === req.body.password) { //Check si les mots de passes correspondent
          res.send(true);
        }
      }
      else {
        res.json(false);
      }
    }
  });
});


app.post('/addColis', function (req, res) {
  Colis.addColis(req,function(err,rows){
    console.log(req.body);
    console.log(rows);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      res.json(rows);
    }
  });
});

app.listen(8080);


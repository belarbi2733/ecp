let express = require('express');
let app = express();
let User = require('./user');
let bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.post('/inscription', function (req, res) {
  console.log("CC");
  User.addUtilisateur(req,function(err,res){
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      res.json(res);
    }
  });
});

app.listen(8080);

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Message = require('../queries/message');
let User = require('../queries/user');
// server.listen(8081);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   req.header("Access-Control-Allow-Origin", "*");
//   req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

router.post('/tournee', function (req, res) {
  Message.tournee(req.body, function (err,result) {
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      res.json(result.rows);
      console.log(result.rows[0]);
    }
  });
});
router.post('/getMessage', function (req, res) {
  Message.getMessage(req.body.idTournee, function (err,result) {
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      console.log('result', result.rows);
      res.json(result.rows);

    }
  });
});
router.post('/message', function (req, res) {
  Message.message(req.body, function (err,result) {
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      res.json(result.rows);
      console.log(result.rows[0]);
    }
  });
});

router.post('/nom', function (req, res) {
  User.getDataById(req.body.idUser, function (err,result) {
    console.log(req.body);
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      res.json(result.rows);
      console.log(result.rows[0]);
    }
  });
});

module.exports = router;




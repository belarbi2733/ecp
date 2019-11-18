let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let User = require('./user');

router.post('/inscription', function (req, res) {
  User.addUtilisateur(req,function(err,rows){
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      res.json(rows);
    }
  });
});

module.exports = router;

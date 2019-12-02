let http = require('http');
let url = require('url');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let User = require('./user');
let Colis = require('./colis');
let Trajet = require('./trajet');
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

app.post('/addtrajet' , function (req, res) {
  Trajet.addTrajet(req,function(err,rows){
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
port=8081;
app.listen(port, ()=>{
    console.log("Server started, listening to "+ port+ " port");
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

var http = require('http');
var url = require('url');
var express = require('express');
var user ;
var app = express();
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
// app.get('/', function (req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.send('hello word page d\'acceuille');
//
// })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.post('/inscription', function (req, res) {
  User.addUtilisateur(req,function(err,rows){
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

app.use(express.urlencoded({extended:TextTrackCue}));
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

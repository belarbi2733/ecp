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

// PGUSER='postgres'
//   PGHOST='localhost'
//   PGPASSWORD='mac'
//   PGDATABASE='Projet_easyCarPool'
//   PGPORT=5432

const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'easycarpool',
    password: '1397',
    port: 5432,
})
// pool.query('SELECT * FROM utilisateur', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'easycarpool',
    password: '1397',
    port: 5432,
})





console.log(user);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.get('/',function (req,res) {


    var inscription = [{
        id_utilisateur: 'test_id',
        adresse_mail: 'test_adress',
        mot_passe: 'test_mot',
        verification_mot_passe: 'test_mot',
    }];

    res.json(inscription);

})

app.post('/', function (req, res) {
    // const query = {
    //     // give the query a unique name
    //     name: 'insert-user',
    //     text: 'Insert INTO utilisateurs(adresse_mail, mot_passe, nom, prenom, datenaissance) VALUES(?, ?, ?, ?, ?)',
    //     values: [(req.body).adresse_mail,
    //         (req.body).mot_passe, 'guy', 'Roland', 1995-10-10],
    // }
    //
    // pool.query('Insert INTO utilisateurs(adresse_mail, mot_passe, nom, prenom, datenaissance) VALUES(?, ?, ?, ?, ?)'
    // values: [(req.body).adresse_mail,
    //     (req.body).mot_passe, 'guy', 'Roland', 1995-10-10]', (err,res) => {
    //         console.log(res)
    //     });
    // console.log('message angular recu!'+ req.body.adresse_mail);
    pool.connect()
    pool.query("Insert into USER (mail, note, nom, prenom) values ($1,$2,$3,$4)",[req.body.adresse_mail,req.body.mot_passe,"qdzfaz","qscqcq"],console.log("Insert done"));

})

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

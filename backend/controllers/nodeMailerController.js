let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
const nodemailer = require('nodemailer');
const cors = require('cors');
let Validation = require('../queries/validation');
var tmp;
let maillist;

//Script nodemailer
router.post('/validationtrajet' , function (requ, resu) {
console.log (requ.body);
Validation.changeStatus(requ.body,function(error,resultat) {
  if(error) {
    resu.status(400).json(error);
    console.error(error);
  }
  else
  {
    //console.log (result)
    //res.json(result);
    //console.log (result.rows[0].mail)
    console.log (resultat);
}} );
}),



router.post('/sendmail' , function (req, res) {
  //console.log(req.body);
  maillist = [];
 
    //
    
  
      for (var it = 0; it < Object.keys(req.body.idTournee).length; it ++) {
        Validation.sendMailValidation(req.body.idTournee[it],function(err,result){
          // console.log(req.body);
          // console.log(result);
          if(err) {
            res.status(400).json(err);
            console.error(err);
          }
          else
          {
            //console.log (result)
            //res.json(result);
            //console.log (result.rows[0].mail)
            console.log (result.rows[0]);  
            router.use(bodyParser.urlencoded({extended:true}));
            router.use(express.json());

            router.use(express.urlencoded({extended:true}));
            //router.get('/sendmail/contact', (req1, res1) => {
            //let subject = req1.query['subject'];
            //let mail = req1.query['mail'];
            //let content = req1.query['content'];
            const output = `
              <p>You have a new contact request</p>
              <h3>Contact Details</h3>
              <ul>
                <li>Trajet: Validation de votre trajet de ${result.rows[0].depart_address} à ${result.rows[0].arrivee_address}</li>
                <li>Tournée: Vous faites partie de la tournée partant de ${result.rows[0].depart_adresse} et arrivant à ${result.rows[0].arrivee_adresse}</li>
                <li>Vous souhaitez valider votre trajet: cliquer sur <a href="http://localhost:4200/validationtrajet=${result.rows[0].id}">Validation</a></li>
              </ul>
              <h3>Message :</h3>
              <p>Voilà</p>
            `;
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              //SMTP SERVER INFO
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "427793c694a343",
                pass: "5f5e7d95203c10"
              }
            });

            // setup email data with unicode symbols
            let mailOptions = {
              from: result.rows[0].mail, // sender address
              to: result.rows[0].mail, // list of receivers
              subject: 'Validation de la tournee' , // Subject line
              text: 'Nouvelle demande de contact reçue :', // plain text body
              html: output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log (error);
                return console.log(error);
                
              }
              else{
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                //res1.send(output);
              }

            
          });
            //ENVOYER MAIL
          }
          //console.log (maillist);
        });
      
    }
  

  
    //findmail();
  

}), 

module.exports = router;



//router.use(cors({origin: "*"}));
//router.use(bodyParser.json({type : '*/*'}));



//module.exports = router;



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


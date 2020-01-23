// # Imports
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
const nodemailer = require('nodemailer');
const cors = require('cors');
let Validation = require('../queries/validation');
var tmp;
let maillist;

// # Lors de l'arrivée sur la page en lien du mail
router.post('/validationtrajet' , function (requ, resu) {
console.log (requ.body);
// ## Update du statut du trajet
Validation.changeStatus(requ.body,function(error,resultat) {
  if(error) {
    resu.status(400).json(error);
    console.error(error);
  }
  else
  {
    // ### Check du statut de chaque trajets afin de confirmer la tournée
    Validation.checkTournee (requ.body, function(err1,result1) {
      if(err1) {
        resu.status(400).json(err1);
        console.error(err1);
      }
      else
      {
        console.log (result1);
        

    }})
}} );
}),


// # Lors de la validation du trajet par le conducteur (envoi des mails au différents participants)
router.post('/sendmail' , function (req, res) {

  maillist = [];
      // ## Envoi de mail pour chaque idtrajet
      for (var it = 0; it < Object.keys(req.body.idTournee).length; it ++) {
        // ### Récupération du mail et d'autres informations à partir d'idtrajet par requête à la base de donnée
        Validation.sendMailValidation(req.body.idTournee[it],function(err,result){
          if(err) {
            res.status(400).json(err);
            console.error(err);
          }
          else
          {
            console.log (result.rows[0]);  
            router.use(bodyParser.urlencoded({extended:true}));
            router.use(express.json());

            router.use(express.urlencoded({extended:true}));
             // #### Construction du mail à partir du résultat de la requète et particulièrement du lien de confirmation
            const output = `
              <p>You have a new contact request</p>
              <h3>Contact Details</h3>
              <ul>
                <li>Trajet: Validation de votre trajet de ${result.rows[0].depart_address} à ${result.rows[0].arrivee_address}</li>
                <li>Tournée: Vous faites partie de la tournée partant de ${result.rows[0].depart_adresse} et arrivant à ${result.rows[0].arrivee_adresse}</li>
                <li>Vous souhaitez valider votre trajet: cliquer sur <a href="http://localhost:4200/validationtrajet?idtrajet=${result.rows[0].id}">Validation</a></li>
              </ul>
              <h3>Message :</h3>
              <p>Voilà</p>
            `;
            // #### Information pour se connecter au serveur mailtrap
            let transporter = nodemailer.createTransport({
              //SMTP SERVER INFO
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "84637efea69817",
                pass: "98bbdbc29c064d"
              }
            });

            // #### Email informations (envoyeur, recepteur, sujet, contenu)
            let mailOptions = {
              from: 'easycarpool@outlook.com', // sender address
              to: result.rows[0].mail, // list of receivers
              subject: 'Validation de la tournee' , // Subject line
              text: 'Nouvelle demande de contact reçue :', // plain text body
              html: output // html body
            };

            // #### Envoi du mail au serveur Mailtrap
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log (error);
                return console.log(error); 
              }
              else{
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
              }

            
          });

          }

        });
      
    }
  

}), 

module.exports = router;
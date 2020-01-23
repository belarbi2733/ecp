let db = require("../db.js");
var maillist = [];
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
const nodemailer = require('nodemailer');
const cors = require('cors');


// # Information pour se connecter au serveur mailtrap
let transporter = nodemailer.createTransport({
    //SMTP SERVER INFO
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "84637efea69817",
      pass: "98bbdbc29c064d"
    }
  });

// # Variable validation accessible à partir du controller
let Validation = {
    
  // ## Récupération du mail et d'autres informations à partir d'idtrajet par requête à la base de donnée
    sendMailValidation: async function(idTournee,callback) {
            console.log (idTournee);
            const tmp = await db.query('SELECT utilisateur.mail, trajet.id_user, trajet.depart_address, trajet.arrivee_address, trajet.id, tournee.arrivee_adresse, tournee.depart_adresse FROM utilisateur INNER JOIN trajet ON trajet.id_user = utilisateur.id inner join tournee on trajet.id_tournee=tournee.id WHERE trajet.id = $1', [idTournee], callback);
            return tmp;
    },

    // ## Update du statut du trajet
    changeStatus : async function(idTrajet,callback) {
            console.log (idTrajet.idTrajet);
            return db.query('UPDATE trajet SET statut = $1 WHERE id = $2',[1,idTrajet.idTrajet], callback);
    },

    // ## Update du statut du trajet 
    checkTournee : async function(idTrajet,callback) {

            tmp = await db.query('SELECT id_tournee FROM trajet WHERE id = $1',[idTrajet.idTrajet]);
            
            tmp1 = await db.query('SELECT trajet.statut FROM trajet WHERE id_tournee = $1',[ tmp.rows[0].id_tournee ]);
            var go = 0;

            // ### Vérification que chaque statuts vaut bien 2 et que la tournée peut donc être confirmée
                for (i = 0; i < tmp1.rows.length; i++) {
                    go += tmp1.rows[i].statut;
                }
                if (go/tmp1.rows.length === 2) {
                    console.log (parseInt(tmp.rows[0].id_tournee));
                    // ### Envoi mail au conducteur comme quoi c'est ok
                    this.sendMailconfirmation (tmp.rows[0].id_tournee);
                    // ### Update du statut de la tournée
                    return db.query('UPDATE tournee SET statut = $1 WHERE id = $2',[1, parseInt (tmp.rows[0].id_tournee) ] ,callback);
                }
                // ### Si ce n'est pas le cas on n'update pas
                else {return null;}
        
    },

    // ## Mail au conducteur
    sendMailconfirmation : async function (idtournee){

        tmp = await db.query('SELECT utilisateur.mail, tournee.arrivee_adresse, tournee.depart_adresse FROM utilisateur INNER JOIN voiture ON utilisateur.id = voiture.id_user INNER JOIN tournee ON voiture.id = tournee.id_voiture  WHERE tournee.id =$1', [idtournee])
        console.log (tmp.rows[0].mail);
        const output = `
              <p>You have a new contact request</p>
              <h3>Contact Details</h3>
              <ul>
                <li>Trajet: Tous les trajets de votre tournée sont validés vous pouvez aller chercher les passagers: </li>
                <li>Vous faites partie de la tournée partant de ${tmp.rows[0].depart_adresse} et arrivant à ${tmp.rows[0].arrivee_adresse}</li>
              </ul>
              <h3>Message :</h3>
              <p>Veuillez récupérer les passagers</p>
            `;
        let mailOptions = {
            from: 'easycarpool@outlook.com', // sender address
            to: tmp.rows[0].mail, // list of receivers
            subject: 'Validation de la tournee effectuée' , // Subject line
                text: 'Aller chercher les passagers !', // plain text body
                html: output // html body
              };

        await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log (error);
                  return console.log(error);
                  
                }
                else{
                  console.log('Message sent: %s', info.messageId);
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                  return null ; 
                }
              
            });
    }

}
module.exports = Validation;
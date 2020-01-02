let db = require("../db.js");
var maillist = [];
//var tmp ;
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
const nodemailer = require('nodemailer');
const cors = require('cors');
//let Validation = require('../queries/validation');

let transporter = nodemailer.createTransport({
    //SMTP SERVER INFO
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "427793c694a343",
      pass: "5f5e7d95203c10"
    }
  });

let Validation = {
    
    sendMailValidation: async function(idTournee,callback) {
        //maillist = [];
        
            console.log (idTournee);
            const tmp = await db.query('SELECT utilisateur.mail, trajet.id_user, trajet.depart_address, trajet.arrivee_address, trajet.id, tournee.arrivee_adresse, tournee.depart_adresse FROM utilisateur INNER JOIN trajet ON trajet.id_user = utilisateur.id inner join tournee on trajet.id_tournee=tournee.id WHERE trajet.id = $1', [idTournee], callback);
            return tmp;
            //console.log (tmp.rows[0].mail)
            
            //console.log (tmp); 
        
        
        
    },
    changeStatus : async function(idTrajet,callback) {
        //maillist = [];
        
            console.log (idTrajet.idTrajet);
            return db.query('UPDATE trajet SET statut = $1 WHERE id = $2',[2,idTrajet.idTrajet], callback);
            //console.log (tmp.rows[0].mail)
            
            //console.log (tmp); 
        
        
        
    },
    checkTournee : async function(idTrajet,callback) {
        //maillist = [];
        
            //console.log (idTrajet.idTrajet);
            tmp = await db.query('SELECT id_tournee FROM trajet WHERE id = $1',[idTrajet.idTrajet]);
            
            //console.log (tmp.rows[0].id_tournee);
            tmp1 = await db.query('SELECT trajet.statut FROM trajet WHERE id_tournee = $1',[ tmp.rows[0].id_tournee ]);
            var go = 0;
                for (i = 0; i < tmp1.rows.length; i++) {
                    //console.log (tmp1.rows[i].statut)
                    go += tmp1.rows[i].statut;
                }
                //console.log (go);
                if (go/tmp1.rows.length === 2) {
                    console.log (parseInt(tmp.rows[0].id_tournee));
                    this.sendMailconfirmation (tmp.rows[0].id_tournee);
                    return db.query('UPDATE tournee SET statut = $1 WHERE id = $2',[1, parseInt (tmp.rows[0].id_tournee) ] ,callback);
                }
                else {return null;}
            //console.log (tmp); 
        
                
        
    },
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
            from: 'ecp@administrator', // sender address
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
                  //res1.send(output);
                  return null ; 
                }
  
              
            });
    }
    
    
    
}

module.exports = Validation;
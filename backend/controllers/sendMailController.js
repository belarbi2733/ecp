let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
const nodemailer = require('nodemailer');
const cors = require('cors');

//Script nodemailer
router.use(cors({origin: "*"}));
router.use(bodyParser.json({type : '*/*'}));
router.use(bodyParser.urlencoded({extended:true}));
router.use(express.json());


router.use(express.urlencoded({extended:true}));
router.get('/contact', (req, res) => {
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
          user: "84637efea69817",
          pass: "98bbdbc29c064d"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'easycarpool@outlook.com', // sender address
      to: req.query['mail'], // list of receivers
      subject: req.query['subject'], // Subject line
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

router.get('/inscription', (req, res) => {
    let mail = req.query['mail'];
    const output = `
      <p>Veuillez confirmer votre inscription</p>
      <h3>Email avec lequel vous vous être inscrit : </h3>
      <p>Email: ${mail}</p>
      <h3>Lien pour valider votre inscription : </h3>
      <a href="https://www.facebook.com/">Lien vers la page de validation</a>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        //SMTP SERVER INFO
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "84637efea69817",
          pass: "98bbdbc29c064d"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'ecp@gmail.be', // sender address
      to: req.query['mail'], // list of receivers
      subject: 'Lien de validation pour linscription', // Subject line
      text: 'Lien de validation pour linscription : ', // plain text body
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

module.exports = router;

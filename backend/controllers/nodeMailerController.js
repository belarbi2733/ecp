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
router.get('/sendmail/contact', (req, res) => {
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

module.exports = router;



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


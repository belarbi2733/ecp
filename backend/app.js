let express = require('express');
let app = express();
let path = require('path');
let LoginController = require('./controllers/loginController');
let ColisController = require('./controllers/colisController');
let TrajetController = require('./controllers/trajetController');
let FindController = require('./controllers/findTrajetController');
let PaypalController = require('./controllers/paypalController');
let TourneeController = require('./controllers/tourneeController');
let AdminController = require('./controllers/adminController');
let AdminDashBoardController = require('./controllers/adminDashBoardController');
let SendMailController = require('./controllers/sendMailController');
let ProfileController = require('./controllers/profileController');
let VoitureController = require('./controllers/voitureController');
let ValidationController = require ('./controllers/nodeMailerController')

app.use(express.static(path.join(__dirname,'/public')));


// !!!!!!!!!! Il faut mettre votre mdp de votre database dans db.js sinon ca fonctionne pas

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




/*
Login Controller    url : /login

  - post /inscription
  - post /checkPassword
  - post /getId
 */
app.use('/login', LoginController);






/*
Colis Controller    url : /colis

  - post /add
 */
app.use('/colis', ColisController);




/*
Trajet Controller    url : /trajet

  - post /add
*/
app.use('/trajet', TrajetController);




/*
Find Trajet Controller    url : /findTrajet

  - post /matchDriverTrajet
  - post /miniTrajet
*/
app.use('/findTrajet', FindController);




/*
Voiture Controller    url : /vehicule

  - post /update
  - post /getDataByIdUser
*/
app.use('/vehicule', VoitureController);





/*
Tournee Controller    url : /tournee

  - post getTourneeByIdUser
 */
app.use('/tournee', TourneeController);





/*
Admin Controller    url : /admin

  - get /list-traj
  - get /list-ut
  - post /list-traj
  - get /dashBoard/getNbreUsers
 */
app.use('/admin', AdminController);



/*
AdminDashBoard Controller    url : /adminDashBoard

  - get /getNbreUsers
  - get /getNbreColis
  - get /getNbreTraj
  - get /getNbreTourn
  - get /getNbreCond
  - get /getNbreColisLivr
  - get /getNbreTrajEffec
  - get /getNbreTournEffec
  - get /getNbreUsersTab
  - get /getNbreColisTab
  - get /getNbreTrajTab
  - get /getNbreTournTab
  - get /getNbreCondTab
  - get /getNbreColisLivrTab
  - get /getNbreTrajEffecTab
  - get /getNbreTournEffecTab
  - post /admin-list-ut
  - post /admin-list-traj
  - post /delete-traj
  - post /enregStat
 */
app.use('/adminDashBoard', AdminDashBoardController);



app.use('/sendmail', SendMailController);



/*
Profile Controller    url : /profile

  - post /personalData/getDataUser
  - post /personalData/update
  - post /deleteAccount
  - post /pref/update
  - post /pref/getPref
  - post /rating
  - post /upload
 */
app.use('/profile', ProfileController);





/*
NodeMailer Controller    url : /nodemailer

  - get /sendmail/contact
 */
app.use('/validation', ValidationController);





/*
Paypal Controller    url : /paypal

  - get /getPrix
  - post /changeStatus
 */
app.use('/paypal', PaypalController);









// Create PORT, deja fait à la fin du fichier
const PORT = process.env.PORT || 8081;
const server = app.listen(PORT, () => {
console.log('Connected to port ' + PORT)
});

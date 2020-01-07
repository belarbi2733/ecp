let express = require('express');
let app = express();
let path = require('path');
let Message = require('./queries/message')
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
let ValidationController = require ('./controllers/nodeMailerController');
let MessageController = require('./controllers/messageController');

app.use(express.static(path.join(__dirname,'/public')));


// !!!!!!!!!! Il faut mettre votre mdp de votre database dans db.js sinon ca fonctionne pas

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// const server = app.listen(PORT, () => {
// console.log('Connected to port ' + PORT)
// });
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8081);
port = 8081;


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


app.use('/message', MessageController);


/*
Paypal Controller    url : /paypal

  - get /getPrix
  - post /changeStatus
 */
app.use('/paypal', PaypalController);





io.on('connection',(socket)=>{

  console.log('new connection made.');


  socket.on('join', function(data){
    //joining
    socket.join(data.room);

    console.log(data.user + 'joined the room : ' + data.room);

    socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
  });


  socket.on('leave', function(data){

    console.log(data.user + 'left the room : ' + data.room);

    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

    socket.leave(data.room);
  });

  socket.on('message',function(data){
    io.in(data.room).emit('new message', {user:data.user,nom:data.nom,prenom:data.prenom, message:data.message, today:data.today, time:data.time});
    Message.addmessage(data);
  })
});

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}




// Create PORT, deja fait à la fin du fichier
const PORT = process.env.PORT || 8081;



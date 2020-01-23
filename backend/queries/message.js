let db = require("../db");

let Message = {

  addmessage: function (message) {
    console.log("insert message en cours...");
    db.query('INSERT INTO message (id_tournee,id_user,message,message_date,message_time) VALUES ($1, $2, $3,$4,$5)', [message.room, message.idUser, message.message, message.today, message.time]);
  },
  message: function(idUser,callback)
  {
    console.log("send message en cours...");
    return db.query('SELECT * from message where id_user = $1 ',[idUser.idUser],callback);
  },
  getMessage: function(id_tournee, callback)
  {
    console.log("get message en cours... ID TOURNEE: "+id_tournee);
    return db.query('SELECT id_tournee, message_date, message, message_time, nom, prenom FROM message, utilisateur WHERE utilisateur.id = message.id_user AND message.id_tournee = $1',[id_tournee],callback);
  },

  tournee: function(idUser,callback)
  {
    console.log("send message en cours...");
    return db.query('SELECT id_tournee, arrivee_address from trajet where id_user = $1',[idUser.idUser],callback);
  },
}
module.exports = Message

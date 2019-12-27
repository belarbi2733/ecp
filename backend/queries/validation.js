let db = require("../db.js");
var maillist = [];
//var tmp ;
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
        
        
        
    }
    
}

module.exports = Validation;
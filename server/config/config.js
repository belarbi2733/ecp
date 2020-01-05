let pg = require("pg");

let config = {
  user: 'postgres',
  database: 'ECP',
//  database: 'ecp',
  password: 'postgremdp',
//  password: 'carpool',
  port: 5432
  //host:'easy-carpool.com',
//ssl: true
};

let pool = new pg.Pool(config);

console.log("Connexion");

module.exports = pool;

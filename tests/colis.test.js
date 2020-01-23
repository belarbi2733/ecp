const request = require('supertest');
let http = require('http');
let url = require('url');
let express = require('express');
let bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

describe('createColis query', () => {
  const {Pool, Client} = require('pg')
  test('It should response the GET method', () => {

    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'pief',
      port: 5432,
    })

    });
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'pief',
      port: 5432,
    })
    client.connect();
    client.query('INSERT INTO colis (nom_colis,volume) VALUES ($1, $2)', ["testcolis", 1], function (err, result) {
      console.log("CC2");

      if (err) {
        console.log("Erreur")
      } else {
      }
    });
    client.query('SELECT  FROM colis WHERE nom_colis = $1', ["testcolis"], function (err, result) {
      if (err) {
        console.log("Erreur")
      } else {
        console.log(result.rows[0].nom_colis);
      }

    });
    client.query('DELETE FROM colis WHERE  = $1', ["testcolis"], function (err, result) {
      if (err) {
        console.log("Erreur")
      } else {
        console.log("Suppression OK");
      }
      client.end();

    });
  });
});

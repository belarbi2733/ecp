const request = require('supertest');
let http = require('http');
let url = require('url');
let express = require('express');
let bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

describe('createUser query', () => {
  const {Pool, Client} = require('pg')
  test('It should response the GET method', () => {

    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'pief',
      port: 5432,
    })
    pool.query('INSERT INTO utilisateur (mail,password,statut) VALUES ($1, $2, $3)', ["Pief@gmail.com", "testmdp", 1], function (err, result) {
      console.log("CC2");
      if (err) {
        console.log("Erreur")
      } else {
      }

    });
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'pief',
      port: 5432,
    })
    client.connect();
    client.query('INSERT INTO utilisateur (mail,password,statut) VALUES ($1, $2, $3)', ["Pief@gmail.com", "testmdp", 1], function (err, result) {
      console.log("CC2");

      if (err) {
        console.log("Erreur")
      } else {
      }
    });
    client.query('SELECT password FROM utilisateur WHERE mail = $1', ["Pief@gmail.com"], function (err, result) {
      if (err) {
        console.log("Erreur")
      } else {
        console.log(result.rows[0].password);
      }

    });
    client.query('DELETE FROM utilisateur WHERE mail = $1', ["Pief@gmail.com"], function (err, result) {
      if (err) {
        console.log("Erreur")
      } else {
        console.log("Suppression OK");
      }
      client.end();

    });
  });
});

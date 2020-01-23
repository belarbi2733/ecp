const request = require('supertest');
jest.mock('../../backend/user');
const app = require('../../backend/app');
let http = require('http');
let url = require('url');
let express = require('express');
let bodyParser = require('body-parser');
let User = require('../../backend/user');
const nodemailer = require('nodemailer');
const cors = require('cors');

describe('Test du root path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200)
    })
  });
});

describe('Test ajout colis ', () => {
  test('It should response the POST method', () => {
    return request(app).post('/addColis').then((response) => {
      expect(response.statusCode).toBe(200)
    })
  });
});


describe('Post Endpoints', () => {
  it('should create a new post', async () => {

    return request(app).post('/inscription').then((response) => {
      expect(response.statusCode).toBe(200)
    })
  })
});

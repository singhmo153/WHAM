var request = require("supertest");
var assert = require('assert');
var chai = require('chai');
var should = chai.should();
var expect = require('expect.js');
var api = request('http://localhost:3000');

var server;
beforeEach(function () {
    server = require('../server').server;
});

describe('Server Test Suite', function () {
   var passport = require('passport');
   var LocalStrategy = require('passport-local').Strategy;
    it('Should respond with Default.htmL file', function (done) {       
        request(server)
          .get('/')
          .expect(200)
          .end(function (err, response) {
              assert.equal(response.header['content-type'], 'text/html; charset=UTF-8');
              done();
          });
    });
    it('Should respond with privacyPolicy.html file', function (done) {
        request(server)
          .get('/privacy')
          .expect(200)
          .end(function (err, response) {
              assert.equal(response.header['content-type'], 'text/html; charset=UTF-8');
              done();
          });
    });

    it('Should retrieve user info based on his email', function (done) {
        request(server)
          .get('/api/user/email=singh.mo@husky.neu.edu')
          .end(function (err, response) {
              assert.equal(response.body.firstName, "ms");
              assert.equal(response.body.lastName, "ms");
          });
        done();
    });

    it('Should display an error if the user is not logged in', function (done) {
        request(server)
            .get('/rest/api/loggedin')
            .end(function (err, res) {
                assert.equal(res.body.firstName, "ms");
                assert.equal(res.body.lastName, "ms");
            });
        done();
    });
});




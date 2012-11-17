/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

var Party = describe('Party', function () {
    property('name', String);
    property('review', String);
    property('image', String);
    property('founded', String);
    property('ideology', String);
    property('website', String);
});var Congresist = describe('Congresist', function () {
    property('name', String);
    property('photo', String);
    property('position', String);
    property('properties', String);
    property('stateId', String);
    property('partyId', String);
    property('salary', Number);
    property('benefits', String);
    property('votes', Number);
    property('status', Number);
    property('background', String);
    property('birthDate', Date);
    property('created_at', Date);
    property('updated_at', Date);
});var Project = describe('Project', function () {
    property('name', String);
    property('summary', String);
    property('text', String);
    property('conId', String);
    property('created', Date);
    property('approval', Date);
    property('created_at', Date);
    property('updated_at', Date);
});var Article = describe('Article', function () {
    property('title', String);
    property('conId', String);
    property('proId', String);
    property('summary', String);
    property('link', String);
    property('created_at', Date);
    property('updated_at', Date);
});
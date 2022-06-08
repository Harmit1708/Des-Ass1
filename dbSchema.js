var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dbName = "Deskala"
var dbUrl = `mongodb+srv://Harmit1708:Harmit@cluster0.brz2m.mongodb.net/${dbName}`;
module.exports = {dbUrl,mongodb,MongoClient}
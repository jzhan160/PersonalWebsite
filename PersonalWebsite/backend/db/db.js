const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
 
// Connection URL
const url = 'mongodb://localhost:27017/PersonalWebsite';
function connect(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("failed to connect to db");
        }
        console.log("Connected successfully to server");

        callback(db)
    })
}



exports.find = function (collection_name, json, callback) {
    connect(function (db) {
        var result = db.collection(collection_name).find(json);
         result.toArray(function (error, data) {
            callback(error, data)
        });
        db.close();
    })
}


exports.insert = function (collection_name, json, callback) {
    connect(function (db) {
        db.collection(collection_name).insertOne(json, function (error, data) {
            callback(error, data)
        });
        db.close();
    })
}


exports.update = function (collection_name, newDoc, condition, callback) {
    connect(function (db) {
        db.collection(collection_name).updateOne(newDoc, { $set: condition }, function (error, data) {
            callback(error, data)
        });
        db.close();
    })
}

exports.delete = function (collection_name, json, callback) {
    connect(function (db) {
        db.collection(collection_name).deleteOne(json, function (error, data) {
            callback(error, data)
        });
        db.close();
    })
}

exports.ObjectID = ObjectID
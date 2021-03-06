const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
 
// Connection URL
const url = 'mongodb://localhost:27017/PersonalWebsite';
function connect(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("failed to connect to db");
        }
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
exports.findAndSort = function (collection_name, json, sort ,callback) {
    connect(function (db) {
        var result = db.collection(collection_name).find(json).sort(sort);
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


exports.update = function (collection_name, condition,newDoc,callback) {
    connect(function (db) {
        db.collection(collection_name).updateOne(condition, { $set: newDoc }, function (error, data) {
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
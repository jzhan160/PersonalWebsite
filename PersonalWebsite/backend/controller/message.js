var express = require("express");
var sd = require('silly-datetime');
var router = express.Router();
var mongoose = require('mongoose')

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var DB = require("../db/db.js");

router.post("/sendMsg", function (req, res) {
    var domainName = req.body.to;
    var name = req.body.name;
    var from = req.body.from;
    var content = req.body.msg;
    DB.insert(
        "messages",
        {
            domainName: domainName,
            from: from,
            name: name,
            content: content,
            seen: 0,
            time: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        },
        function (err, data) {
            res.status(200).json({ user: "msg saved" });
        }
    );

});

router.post('/getUnreadMsg', function (req, res) {
    var domainName = req.body.domainName;
    DB.findAndSort(
        'messages',
        {
            domainName: domainName,
            seen: 0
        },
        { time: -1 },
        function (err, data) {
            if (err)
                console.log(err);
            else {
                res.status(200).json(data);
            }
        }
    )
});


router.post('/deleteMsg', function (req, res) {
    var id = mongoose.Types.ObjectId(req.body.msgId);
    DB.find(
        'messages',
        {
            _id: id,
        },
        function (err, data) {
            if (err)
                console.log(err);
            else {
                console.log(data);
            }
        }
    );
    DB.delete(
        'messages',
        {
            _id: id,
        },
        function (err, data) {
            if (err)
                console.log(err);
            else {
                res.status(200).json({res:'msg deleted'});
            }
        }
    )
});

router.post('/setRead', function (req, res) {
    var id = mongoose.Types.ObjectId(req.body.msgId);
    console.log(id);
    DB.update(
        'messages',
        {
            _id: id,
        },
        {
            seen: 1
        },
        function (err, data) {
            if (err)
                console.log(err);
            else {
                res.status(200).json({res:'msg deleted'});
            }
        }
    )
});


module.exports = router;

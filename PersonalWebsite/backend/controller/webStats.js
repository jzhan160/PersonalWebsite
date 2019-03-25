var express = require("express");
var router = express.Router();
var md5 = require("md5-node");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var DB = require("../db/db.js");

router.post("/getHistory", function(req, res) {
    var domainName = req.body.domainName;
    var date = req.body.date;

    DB.find(
      "webStats",
      {
        domainName: domainName,
      },
      function(error, data) {
        if (error) {
          console.log(error);
        }
        if (data.length > 0) {
          req.session.domain = data[0].domainName;
          res
            .status(200)
            .json({
                stats : data[0].history
            });
        } else {
          res.status(401).json({ domain: "NONE" });
        }
      }
    );
  });
var express = require("express");
var router = express.Router();

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var DB = require("../db/db.js");

router.post("/get", function(req, res) {
  var domainName = req.body.domainName;
  DB.find(
    "resumes",
    {
      domainName: domainName
    },
    function(error, data) {
      if (error) {
        console.log(error);
      }
      if (data.length > 0) {
        res.status(200).json({education: data[0].edu, experience: data[0].exp, skills: data[0].skill});
      }else{
        res.status(404).json({ user: "resume not found" });
      }  
    }
  );
 });

router.post("/edit", function(req, res) {});

router.post("/save", function(req, res) {
  var edu = req.body.education;
  var exp = req.body.experience;
  var skill = req.body.skills;
  var domainName = req.body.domainName;
  DB.find(
    "resumes",
    {
      domainName: domainName
    },
    function(error, data) {
      if (error) {
        console.log(error);
      }
      if (data.length > 0) {
        DB.update(
          "resumes",
          {
            domainName: domainName
          },
          {
            edu: edu,
            exp: exp,
            skill: skill
          },

          function(err, data) {
            res.status(200).json({ user: "resume saved" });
          }
        );
      } else {
        DB.insert(
            "resumes",
            {
              domainName: domainName,
              edu: edu,
              exp: exp,
              skill: skill
            },
            function(err, data) {
              res.status(200).json({ user: "resume saved" });
            }
          );
      }
    }
  );
});


module.exports = router;

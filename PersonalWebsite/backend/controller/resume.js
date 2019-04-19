var express = require("express");
var router = express.Router();

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var DB = require("../db/db.js");

router.post("/get", function (req, res) {
  var domainName = req.body.domainName;
  DB.find(
    "users",
    {
      domainName: domainName
    },
    function (error, data) {
      if (error) {
        console.log(error);
      }
      var username = data[0].username;
      var phone = data[0].phone;
      var address = data[0].address;
      var email = data[0].email;
      DB.find(
        "resumes",
        {
          domainName: domainName
        },
        function (error, data) {
          if (error) {
            console.log(error);
          }
          if (data.length > 0) {
            res.status(200).json({
              username: username, education: data[0].edu,
              experience: data[0].exp, skills: data[0].skill,
              phone: phone, address: address,email:email
            });
          } else {
            res.status(404).json({ user: "resume not found" });
          }
        }
      );
    }
  );

});

router.post("/edit", function (req, res) { });

router.post("/save", function (req, res) {
  var edu = req.body.education;
  var exp = req.body.experience;
  var skill = req.body.skills;
  separateLines(exp);
  var domainName = req.body.domainName;
  DB.find(
    "resumes",
    {
      domainName: domainName
    },
    function (error, data) {
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

          function (err, data) {
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
          function (err, data) {
            res.status(200).json({ user: "resume saved" });
          }
        );
      }
    }
  );
});

function separateLines(exp){
  for (let i = 0; i < exp.length; i++) {
    var descrip = exp[i].descrip;
    var sentences = descrip.split(".");
    exp[i].descrip = sentences;
   }

}
module.exports = router;

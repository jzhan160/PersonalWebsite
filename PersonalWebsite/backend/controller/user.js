var express = require("express");
var router = express.Router();
var md5 = require("md5-node");

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var DB = require("../db/db.js");

router.post("/do_register", function(req, res) {
  var email = req.body.email;
  var password = md5(req.body.password);
  DB.find(
    "users",
    {
      email: email
    },
    function(error, data) {
      if (error) {
        console.log(error);
      }
      if (data.length > 0) {
        res.status(400).json({ user: "Email existed" });

      } else {
        DB.insert(
          "users",
          {
            email: email,
            password: password
          },
          function(err, data) {
            req.session.email = req.body.email;
            res.status(200).json({ user: "Added successfully" });
          }
        );
      }
    }
  );
});

router.post("/login",function(req,res){
  res.status(401).json({ user: "unauthorizied" });

});

router.post("/searchDomainName", function(req, res) {
  var domainName = req.body.domainName;
   DB.find(
    "users",
    {
      domainName: domainName,
     },
    function(error, data) {
      if (error) {
        console.log(error);
      }
      if (data.length > 0) {
        //data is a json array!
         //console.log(data[0].email);
         res.status(200).json({ user: "Find domain name" , email: data[0].email, templateId: data[0].templateId});
      } else {
        res.status(404).json({ user: "No domain name" });
      }
    }
  );
});


router.post("/do_login", function(req, res) {
  var email = req.body.email;
  var password = md5(req.body.password);
  DB.find(
    "users",
    {
      email: email,
      password: password
    },
    function(error, data) {
      if (error) {
        console.log(error);
      }
      if (data.length > 0) {
        console.log(data);
        req.session.email = req.body.email;
        res.status(200).json({ user: "Login successfully" ,templateId:"1" });
      } else {
        res.status(401).json({ user: "unauthorizied" });
      }
    }
  );
});

router.get("/index", function(req, res) {
  res.render("index");
});

router.get("/logout", function(req, res) {
  req.session.username = null;
  res.status(200).json({ user: "Logout" });
});

router.get("/setup", function(req, res) {
  //this part shoule be optimized later to avoid deplicated setups
  res.render("setup");
});

router.post("/template", function(req, res) {
  //get the template number from the request and store it in db
  var templateId = req.body.templateId;
  console.log("templateId");
  console.log(templateId);
  res.status(200).json({ user: "pageTemplate_selected" });
});

router.post("/submit_info", function(req, res) {
  //get the info from the request and store it in db
  console.log(req.body);
  res.status(200).json({ user: "info" });
});

module.exports = router;

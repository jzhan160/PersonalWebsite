var express = require("express");
var router = express.Router();
var md5 = require("md5-node");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var DB = require("../db/db.js");

router.post("/do_register", function (req, res) {
  var email = req.body.email;
  var password = md5(req.body.password);
  DB.find(
    "users",
    {
      email: email
    },
    function (error, data) {
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
          function (err, data) {
            res.status(200).json({ user: "Added successfully" });
          }
        );
      }
    }
  );
});


router.post("/searchDomainName", function (req, res) {
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
      if (data.length > 0) {
        res.status(200).json({
          user: "Find domain name",
          templateId: data[0].templateId,
          username: data[0].username,

        });
      } else {
         res.status(404).json({ user: "No domain name" });
      }
    }
  );
});

router.post("/do_login", function (req, res) {
  var email = req.body.email;
  var password = md5(req.body.password);
  DB.find(
    "users",
    {
      email: email,
      password: password
    },
    function (error, data) {
      if (error) {
        console.log(error);
      }
      if (data.length > 0) {
        req.session.domain = data[0].domainName;
        console.log(req.session)
        res
          .status(200)
          .json({
            user: "Login successfully",
            templateId: "1",
            session: req.session.domain
          });
      } else {
        res.status(401).json({ user: "unauthorizied" });
      }
    }
  );
});


router.get("/logout", function (req, res) {
  req.session.domainName = null;
  res.status(200).json({ user: "Logout" });
});


router.post("/submit_info", function (req, res) {
  var email = req.body.email; //insert by email
  var templateId = req.body.templateId;
  var username = req.body.username;
  var domainName = req.body.domainName;
  //create a folder for project
  fs.mkdir('./user_repo/' + domainName);
  var address = req.body.address;
  var phone = req.body.phone;
  var path = domainName + "/" + req.body.filename;
  moveFile(req.body.path, req.body.filename, domainName);
  DB.update(
    "users",
    {
      email: email
    },
    {
      username: username,
      domainName: domainName,
      address: address,
      photoPath: path,
      phone: phone,
      templateId: templateId
    },
    function (err, data) {
      req.session.domainName = domainName;
      res.status(200).json({ user: "info completed" });
    }
  );
});

function moveFile(originalPath, filename, domainName) {
  dest = "./uploads/" + domainName;
  if (!fs.exists(dest)) {
    fs.mkdir(dest);
  }
  fs.rename(originalPath, dest + "/" + filename, function (err) {
    if (err) {
      console.log(err);
    }
    fs.stat(dest + "/" + filename, function (err, stats) {
      if (err) {
        console.log(err);
      }
    });
  });
}

router.post("/getInfo", function (req, res) {
  var domainName = req.body.domainName;
  console.log(domainName);
  DB.find(
    "users",
    {
      domainName: domainName
    },
    function (error, data) {
      if (error) {
        console.log(error);
      }
      if (data.length > 0) {
        console.log(data[0].photoPath);

        res.status(200).json({
          photoPath: data[0].photoPath,
          username: data[0].username
        });
      } else {
        res.status(404).json({ user: "No domain name" });
      }
    }
  );
}
);

module.exports = router;

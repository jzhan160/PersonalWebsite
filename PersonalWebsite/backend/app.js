// the dispatcher app

var express = require("express");
var cors = require("cors"); // for connection between back end and front end
var app = express();
app.use(cors());
app.use(express.static("uploads"));

const session = require("express-session");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 2 },
    rolling: true //reset the expire time,
  })
);

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");   //设置跨域访问
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
  res.header("Content-Type", "application/x-www-form-urlencoded");
  next();
});

app.use(function (req, res, next) {
  console.log(req.session);
  if (req.url == "/getSession") {
    if ( app.locals["domainName"] &&  app.locals["domainName"] != "") {
      console.log('session: '+ app.locals["domainName"]);
      res.status(200).json({ domainName: app.locals["domainName"] });
    } else {
      //if the session expires
      console.log('no session');
      res.status(404).json({});
    }
  }
  else {
    if (req.session.domain && req.session.domain != "") {
      //global data
       app.locals["domainName"] = req.session.domain;
       console.log("domain sess: "+ app.locals["domainName"]);
      }
    next();
  }
}
);

var user = require("./controller/user");
var resume = require("./controller/resume");
var repo = require("./controller/repo");
var story = require("./controller/story");
var dashboard = require("./controller/dashboard");
var file = require("./controller/file");
var webStats = require("./controller/webStats");
var message = require("./controller/message");

app.use("/", user);
app.use("/resume", resume);
app.use("/repo", repo);
app.use("/story", story);
app.use("/dashboard", dashboard);
app.use("/file", file);
app.use("/message", message);

app.listen(8080, "localhost", function () {
  console.log('Node.js server is running on port 8080');
});

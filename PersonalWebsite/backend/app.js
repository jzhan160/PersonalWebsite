// the dispatcher app

var express = require("express");
var cors = require("cors"); // for connection between back end and front end
var app = express();
app.use(cors());
app.set("view engine", "ejs"); //the default ejs path is ./views
app.use(express.static("public")); //the default path for static resources is ./public

const session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 2 },
    rolling: true //reset the expire time
  })
);

app.use(function(req, res, next) {
  if (
    req.url == "/login" ||
    req.url == "/do_login" ||
    req.url == "/register" ||
    req.url == "/do_register" ||
    req.url == "/logout"
  ) {
    next();
  } else if (req.session.username && req.session.username != "") {
    //global data
    app.locals["username"] = req.session.username;
    next();
  } else {
    //if the session expires
    res.redirect("/login");
  }
});

var user = require("./controller/user");
var resume = require("./controller/resume");
var repo = require("./controller/repo");
var story = require("./controller/story");
var dashboard = require("./controller/dashboard");

app.use("/", user);
app.use("/resume", resume);
app.use("/repo", repo);
app.use("/story", story);
app.use("/dashboard", dashboard);

app.listen(8080, "localhost");

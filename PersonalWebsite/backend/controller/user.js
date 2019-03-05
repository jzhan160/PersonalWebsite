var express = require('express')
var router = express.Router();
var md5 = require('md5-node');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

var DB = require('../db/db.js');

router.get('/register', function (req, res) {
    res.render('register');
})
router.post('/do_register', function(req,res){
    var username = req.body.username;
    var password = md5(req.body.password);
    DB.find('users', {
        username: username
    }, function (error, data) {
        if (error) {
            console.log(error);
        }
        if (data.length > 0) {
              res.end("<script>alert('Account exited.'); location.href = '/register'</script>");
        }
        else {
            DB.insert('users',{
                username: username,
                password: password
            },function(err, data){
                req.session.username = req.body.username;
                res.redirect('/setup');
            });
         }
    });
})


router.get('/login', function (req, res) {
    res.render('login');
})

router.post('/do_login', function (req, res) {
    var username = req.body.username;
    var password = md5(req.body.password);
    DB.find('users', {
        username: username,
        password: password
    }, function (error, data) {
        if (error) {
            console.log(error);
        }
        if (data.length > 0) {
            console.log(data);
            req.session.username = req.body.username;
            res.redirect('/index');
        }
        else {
            res.end("<script>alert('please login.'); location.href = '/login'</script>");
        }
    });
})

router.get('/index', function (req, res) {
    res.render('index');
})


router.get('/logout', function (req, res) {
    req.session.username = null;
    res.render('login');
})


router.get('/setup',function(req,res){
    //this part shoule be optimized later to avoid deplicated setups
    res.render('setup');
})
router.post('/pageTemplate_selected',function(req,res){
      //get the template number from the request and store it in db
      res.render('complete_info');    
})
router.post('/submit_info',function(req,res){
     //get the info from the request and store it in db
     res.redirect('/index');    
})

module.exports = router
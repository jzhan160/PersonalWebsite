var express = require('express')
var router = express.Router();
 
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

var DB = require('../db/db.js');

router.get('/', function (req, res) {
    res.render('dashboard.ejs');
})

 
module.exports = router
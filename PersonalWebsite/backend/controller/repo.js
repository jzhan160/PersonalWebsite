var express = require('express')
var router = express.Router();
 
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

var DB = require('../db/db.js');

router.get('/show', function (req, res) {
    res.render('repo.ejs');
})

 router.post('/upload', function (req, res) { })

router.get('/download', function (req, res) {})


module.exports = router
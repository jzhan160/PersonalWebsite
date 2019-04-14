var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');



router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

var DB = require('../db/db.js');

router.get('/show', function (req, res) {
    res.render('repo.ejs');
})

 router.post('/upload', function (req, res) {
     console.log('upload new project');
     
     var store = multer.diskStorage({
        destination: function(req, file, cb){
            var filePath = './user_repo/' + file.originalname.split('.')[0];
            cb(null, filePath);
        },
        filename:function(req, file, cb){
            var filname = file.originalname.substr(file.originalname.split('.')[0].length + 1);
            cb(null, filname);
        }
    });

    var upload = multer({storage:store}).single('file');

     upload(req, res, function(err){
         if(err){
             return res.status(501).json({msg : err});
         }
         return res.json({msg: 'upload file successfully'})
     }) 
  })

router.get('/download', function (req, res) {})


module.exports = router
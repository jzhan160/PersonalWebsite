const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
 const router = express.Router();

const DIR = './uploads/public';
var fileName = '';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
       fileName = file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname);
      cb(null, fileName);
    }
});
let upload = multer({storage: storage});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
 
// router.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });
 

router.post('/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
         console.log('file received');
         return res.send({
          success: true,
          path: req.file.path,
          filename: req.file.filename
        })
      }
});
 

module.exports = router;

var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var unzip = require('unzip2');
var fs = require('fs');
var path = require("path");

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

var DB = require('../db/db.js');

router.post('/showFolderList', function (req, res) {
    console.log('show folder List');
    const pathName = './user_repo/' + req.body.path;
    console.log(pathName);
    var dirs = [];
    try {
        fs.readdirSync(pathName).forEach((file) => {
            let stat = fs.lstatSync(pathName + '/' + file)
            if (stat.isDirectory() === true) {
                dirs.push({ name: file });
            }
        });
        console.log(dirs);
        res.status(200).json(dirs);
    } catch (e) {
        res.status(501).json({ msg: e });
    }
})

router.post('/showFileList', function (req, res) {
    console.log('show file List');
    const pathName = './user_repo/' + req.body.path;
    console.log(pathName);
    var files = [];
    try {
        fs.readdirSync(pathName).forEach((file) => {
            let stat = fs.lstatSync(pathName + '/' + file)
            if (stat.isDirectory() === false) {
                files.push({ name: file });
            }
        });
        console.log(files);
        res.status(200).json(files);
    } catch (e) {
        res.status(501).json({ msg: e });
    }


})


//handle upload request
router.post('/upload', function (req, res) {
    console.log('upload new project');
    var filePath;
    var fileName;
    //zip file will be store in ./user_repo/_domainName
    var store = multer.diskStorage({
        destination: function (req, file, cb) {
            filePath = './user_repo/' + file.originalname.split('.')[0];
            cb(null, filePath);
        },
        filename: function (req, file, cb) {
            fileName = file.originalname.substr(file.originalname.split('.')[0].length + 1);
            cb(null, fileName);
        }
    });

    var upload = multer({ storage: store }).single('file');

    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({ msg: err });
        }
        //unzip the file
        //project Name: the zip filename without extension
        if(fileName.split('.').pop() != 'zip'){
            return res.json({ msg: 'upload successfully!' })
        }
        var projectName = fileName.substr(0, fileName.length - 4);
        fs.createReadStream(filePath + '/' + fileName).pipe(unzip.Extract({
            path: filePath + '/' + projectName
        }))
        return res.json({ msg: 'upload and unzip successfully!' })
    })
})

router.get('/download', function (req, res) { })


//return file content
router.post('/showFileContent', function (req, res) {
    console.log('show file content');
    const filePath = './user_repo/' + req.body.filePath;
    console.log(filePath);

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            res.status(501).json({msg: err});
        }
        res.status(200).json(data);
    });
})


module.exports = router
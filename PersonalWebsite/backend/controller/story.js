var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
var mongoose = require('mongoose')
var DB = require('../db/db.js');


// router.post("/do_register", function(req, res) {
//     var email = req.body.email;
//     var password = md5(req.body.password);
//     DB.find(
//       "users",
//       {
//         email: email
//       },
//       function(error, data) {
//         if (error) {
//           console.log(error);
//         }
//         if (data.length > 0) {
//           res.status(400).json({ user: "Email existed" });
//         } else {
//           DB.insert(
//             "users",
//             {
//               email: email,
//               password: password
//             },
//             function(err, data) {
//               res.status(200).json({ user: "Added successfully" });
//             }
//           );
//         }
//       }
//     );
//   });


router.post('/add', function (req, res) {
    const story = req.body;
    DB.insert('story', story, function (err, data) {
        res.status(200).json("msg: Added successfully!");
    })
});

router.post('/get', function(req,res){
    console.log(1);
    const domain = req.body.domain;
    console.log(domain);
    DB.find('story',{
        domain: domain
    }, function(error, data){
        if(error){
            console.log(err);
        }else{
            console.log(data);
            res.status(200).json(data);
        }
    })
});

router.post('/del', function(req,res){
    console.log('del operation');
    var id = mongoose.Types.ObjectId(req.body.id);
    DB.delete('story',{
        _id: id
    }, function(error, data){
        if(error){
            console.log(err);
        }else{
            res.status(200).json("msg: Deleted successfully!");
        }
    })
});

//TODO:
router.post('/edit', function(req,res){
    console.log('edit operation');
    var id = mongoose.Types.ObjectId(req.body.id);
    var newInput = req.body.input;
    var originStory;
    DB.find('story',{
        _id: id
    }, function(error, data){
        if(error){
            console.log(err);
        }else{
            originStory = data[0];
        }
    })
});


module.exports = router
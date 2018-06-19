const express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const fixtures = require('./fixtures');
const teams = require('./teams');
const users = require('./users'); 

const db = mongoose.connect("mongodb://admin:passw0rd@ds163480.mlab.com:63480/fifa18", function(err, response){  
   if(err) {
        console.log( err);
    } else {
        console.log('Connected to ' + db, ' + ', response);
    }  
}); 

/* Requests */
router.get("/getFixtures", function(req, res) {  
    fixtures.find({}).sort({'_id': 'asc'}).exec(function(err, data) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(data);  
        }  
    });  
})

router.get("/getTeams", function(req, res) {  
    teams.find({}).sort({'_id': 'asc'}).exec(function(err, data) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(data);  
        }  
    });  
})

router.post("/register", function(req, res) {
    var newUser = new users(req.body);  
    newUser.save(function(err) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(true);  
        }  
    });  
})

router.post("/login", function(req, res) { 
    var user = req.body;  
    users.find()
    .where('username').equals(user.username)
    .where('password').equals(user.password)
    .select('name')
    .exec(function(err, data) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(data);  
        }  
    });  
})


module.exports = router;
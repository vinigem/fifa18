const express = require('express');
const app = express();
const mongoose = require("mongoose");
const models = require('./models'); 

const db = mongoose.connect("mongodb://admin:passw0rd@ds163480.mlab.com:63480/fifa18", function(err, response){  
   if(err) {
        console.log( err);
    } else {
        console.log('Connected to ' + db, ' + ', response);
    }  
}); 

var fixtures = mongoose.model('fixtures', model.Fixture);
var teamModel = mongoose.model('teams', model.Team);
var userModel = mongoose.model('users', model.User);

/* Requests */
app.get("/api/getFixtures", function(req, res) {  
    fixtureModel.find({}).sort({'_id': 'asc'}).exec(function(err, data) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(data);  
        }  
    });  
})

app.get("/api/getTeams", function(req, res) {  
    teamModel.find({}).sort({'_id': 'asc'}).exec(function(err, data) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(data);  
        }  
    });  
})

app.post("/api/register", function(req, res) {
    var newUser = new userModel(req.body);  
    newUser.save(function(err) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(true);  
        }  
    });  
})

app.post("/api/login", function(req, res) { 
    var user = req.body;  
    userModel.find()
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
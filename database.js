const mongoose = require("mongoose");
const express = require('express');
const app = express();  
  
const db = mongoose.connect("mongodb://admin:passw0rd@ds163480.mlab.com:63480/fifa18", function(err, response){  
   if(err) {
        console.log( err);
    } else {
        console.log('Connected to ' + db, ' + ', response);
    }  
}); 

const Schema = mongoose.Schema;

var fixtureSchema = new Schema({      
    name: String ,
    matches: [
        {
            num: Number,
            date: String,
            time: String,
            team1: {
                name: String,
                code: String
            },
            team2: {
                name: String,
                code: String
            },
            score1: Number,
            score2: Number,
            group: String,
            stadium: {
                key: String,
                name: String
            },
            city: String,
            timezone: String
        }
    ]  
}, { versionKey: false });

var teamSchema = new Schema({      
    id: Number,       
    name: String,
    fifaCode: String,
    flag: String   
}, { versionKey: false });

var fixtureModel = mongoose.model('fixtures', fixtureSchema, 'fixtures');
var teamModel = mongoose.model('teams', teamSchema, 'teams');

app.get("/api/getFixtures",function(req,res) {  
    fixtureModel.find({}, function(err,data) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(data);  
        }  
    });  
})

app.get("/api/getTeams",function(req,res) {  
    teamModel.find({}, function(err,data) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(data);  
        }  
    });  
})  
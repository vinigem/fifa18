const path = require('path');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
    
app.use(express.static(__dirname + '/dist/fifa18'));
app.set('port', process.env.PORT || 5000);
   
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

// Instruct the app to use the forceSSL middleware
app.use(forceSSL());

// Mongo DB
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

app.get("/api/getFixtures",function(req, res) {  
    fixtureModel.find({}).sort({'_id': 'asc'}).exec(function(err, data) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(data);  
        }  
    });  
})

app.get("/api/getTeams",function(req,res) {  
    teamModel.find({}).sort({'_id': 'asc'}).exec(function(err, data) {  
        if(err) {  
            res.send(err);  
        } else {                
            res.send(data);  
        }  
    });  
})
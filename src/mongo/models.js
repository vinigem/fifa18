const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const fixtureSchema = new Schema({      
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

const teamSchema = new Schema({      
    id: Number,       
    name: String,
    fifaCode: String,
    flag: String   
}, { versionKey: false });

const userSchema = new Schema({      
    id:  Schema.Types.ObjectId,       
    name: String,
    mobile: Number,
    username: String,
    password: String
}, { versionKey: false });

exports.Fixture = fixtureSchema;
exports.Team = teamSchema;
exports.User = userSchema;

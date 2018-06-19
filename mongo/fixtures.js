const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const fixtureSchema = new Schema({ 
    _id: Number,     
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

module.exports = mongoose.model('fixtures', fixtureSchema );
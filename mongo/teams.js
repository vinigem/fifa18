const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const teamSchema = new Schema({      
    id: Number,       
    name: String,
    fifaCode: String,
    flag: String   
}, { versionKey: false });

module.exports = mongoose.model('teams', teamSchema );

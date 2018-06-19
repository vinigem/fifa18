const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userSchema = new Schema({      
    id:  Schema.Types.ObjectId,       
    name: String,
    mobile: Number,
    username: String,
    password: String,
    role: String
}, { versionKey: false });

module.exports = mongoose.model('users', userSchema );
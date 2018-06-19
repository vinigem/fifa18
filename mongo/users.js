const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userSchema = new Schema({      
    id:  Schema.Types.ObjectId,       
    name: String,
    mobile: Number,
    username: { type: String, unique: true },
    password: String,
    role: String
}, { versionKey: false, strict: true });

module.exports = mongoose.model('users', userSchema );
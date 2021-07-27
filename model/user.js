const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: true,
        min: 4,
        max:255


    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 4,
    },
    password:{
        type: String ,
        required: true,
        max: 1024,
        min:4,

    },
    date: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('User', userSchema);
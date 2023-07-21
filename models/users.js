const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
    },
    phone:{
        type: 'string',
        required: true,
    },
    image:{
        type: 'string',
        required: true,
    },
    created:{
        type: 'date',
        required: true,
        default: Date.now,
    }
});
module.exports = mongoose.model('User', userSchema);
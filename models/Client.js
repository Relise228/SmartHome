const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telephoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'home',
        required: false
    },
    type: {
        type: String,
        default: "User"
    }
},
{ 
    versionKey: false 
})

module.exports = Client = mongoose.model('client', ClientSchema);
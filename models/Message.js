const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    consultant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    text: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Не прочитано'
    }
},
{ 
    versionKey: false 
})

module.exports = Message = mongoose.model('message', MessageSchema);
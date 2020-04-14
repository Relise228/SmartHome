const mongoose = require('mongoose');

const LastSystemSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    system: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'smartHomeSystem'
    }
},
{ 
    versionKey: false 
})

module.exports = LastSystem = mongoose.model('lastSystem', LastSystemSchema);
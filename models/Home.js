const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    homeType: {
        type: String,
        required: true
    },
    homeSize: {
        type: Number,
        required: true
    },
    roomsNumber: {
        type: Number,
        required: true
    }
})

module.exports = Home = mongoose.model('home', HomeSchema);
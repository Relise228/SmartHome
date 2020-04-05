const mongoose = require('mongoose');

const SystemCounterSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 1000
    }
})

module.exports = SystemCounter = mongoose.model('systemCounter', SystemCounterSchema);
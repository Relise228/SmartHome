const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
    specialist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Очікує на обслуговування'
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{ 
    versionKey: false 
})

module.exports = ServiceRequest = mongoose.model('serviceRequest', ServiceRequestSchema);
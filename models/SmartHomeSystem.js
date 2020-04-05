const mongoose = require('mongoose');

const SmartHomeSystemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: false
        }
    ],
    code: {
        type: Number,
        required: false
    },
    manufacturer: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    wirelessStandart: {
        type: String,
        required: true
    },
    controlOption: {
        type: String,
        required: true
    },
    warrantyPeriod: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }
})

module.exports = SmartHomeSystem = mongoose.model('smartHomeSystem', SmartHomeSystemSchema);
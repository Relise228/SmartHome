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
        required: false
    },
    controlOption: {
        type: String,
        required: false
    },
    warrantyPeriod: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Not Visible"
    }
},
{ 
    versionKey: false 
})

module.exports = SmartHomeSystem = mongoose.model('smartHomeSystem', SmartHomeSystemSchema);
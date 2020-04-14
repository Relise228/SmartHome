const mongoose = require('mongoose');

const DeliveryRequestSchema = new mongoose.Schema({
    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    status: {
        type: String,
        default: 'Замовлення на складі'
    },
    deliveryTime: {
        type: Date,
        required: false
    }
},
{ 
    versionKey: false 
})

module.exports = DeliveryRequest = mongoose.model('deliveryRequest', DeliveryRequestSchema);
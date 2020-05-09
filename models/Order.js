const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    address: {
        type: String,
        default: 'Адреса не вказана'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productInOrder'
        }
    ],
    totalPrice: {
        type: Number,
        required: false
    },
    number: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        default: 'Cart'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, 
{ 
    versionKey: false 
})

module.exports = Order = mongoose.model('order', OrderSchema);
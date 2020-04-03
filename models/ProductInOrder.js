const mongoose = require('mongoose');

const ProductInOrderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'smartHomeSystem',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = ProductInOrder = mongoose.model('productInOrder', ProductInOrderSchema);
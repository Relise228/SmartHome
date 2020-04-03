const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    bank: {
        type: String,
        required: true
    },
    transactionNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Обробляється"
    }
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
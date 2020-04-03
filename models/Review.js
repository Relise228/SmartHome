﻿const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'smartHomeSystem'
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Review = mongoose.model('message', ReviewSchema);
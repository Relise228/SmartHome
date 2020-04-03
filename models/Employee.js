const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    pib: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    accessType: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telephoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = Employee = mongoose.model('employee', EmployeeSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Department:{
        type: String,
        required: true
    },
    Telephone:{
        type: String,
        required: true
    },
    Salary:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
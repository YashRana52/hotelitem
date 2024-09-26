const mongoose = require('mongoose');

// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Corrected from 'require' to 'required'
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true // Corrected from 'require' to 'required'
    },
    mobile: {
        type: String,
        required: true // Corrected from 'require' to 'required'
    },
    email: {
        type: String,
        required: true, // Corrected from 'require' to 'required'
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true // Corrected from 'require' to 'required'
    }
});

// Create person model
const Person = mongoose.model('Person', personSchema); // Use PascalCase for model name
module.exports = Person;

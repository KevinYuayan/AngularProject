const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotivationSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title must not be empty'
    },
    description: {
        type: String,
        default: '',
        trim: true,
        required: 'Description must not be empty'
    },
    mediaLink: {
        type: String,
        default: '',
        trim: true,
    }
});

// Created course schema
mongoose.model('Motivation', MotivationSchema);

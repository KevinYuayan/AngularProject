const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
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
    dateCreated: {
        type: Date,
        default: new Date(),
        trim: true,
        required: 'Date must not be empty'
    },
    
    patient: {
        type: Schema.ObjectId,
        ref: 'User'
    }

});

mongoose.model('Alert', AlertSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymptomSchema = new Schema({
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
    }
});

mongoose.model('Symptom', SymptomSchema);

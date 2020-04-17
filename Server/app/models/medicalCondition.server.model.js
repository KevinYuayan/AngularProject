const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalConditionSchema = new Schema({
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
    symptoms: [{
        type: Schema.Types.ObjectId,
        ref: 'Symptom'
    }]
});

mongoose.model('MedicalCondition', MedicalConditionSchema);

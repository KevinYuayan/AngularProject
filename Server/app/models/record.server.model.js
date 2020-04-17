const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    bodyTemperature: {
        type: Number,
        default: '',
        trim: true,
        required: 'Body temperature must not be empty'
    },
    heartRate: {
        type: Number,
        default: '',
        trim: true,
        required: 'Heart rate must not be empty'
    },
    bloodPressure: {
        type: Number,
        default: '',
        trim: true,
        required: 'Blood pressure must not be empty'
    },
    respiratoryRate: {
        type: Number,
        default: '',
        trim: true,
        required: 'Respiratory rate must not be empty'
    },
    weight: {
        type: Number,
        default: '',
        trim: true,
        required: 'Weight must not be empty'
    },
    dateCreated: {
        type: Date,
        default: new Date(),
        trim: true,
        required: 'Date must not be empty'
    },

    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

mongoose.model('Record', RecordSchema);

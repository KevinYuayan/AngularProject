// Load the module dependencies:
//  config.js module and mongoose module
var config = require('./config'),
    mongoose = require('mongoose');
// Define the Mongoose configuration method
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    const db = mongoose.connect(config.db, {
		useUnifiedTopology: true,
		useNewUrlParser: true, useCreateIndex: true 
		}).then(() => console.log('DB Connected!'))
		.catch(err => {
		console.log('Error');
		});

    require('../app/models/alert.server.model');
    require('../app/models/medicalCondition.server.model');
    require('../app/models/motivation.server.model');
    require('../app/models/record.server.model');
    require('../app/models/symptom.server.model');
    require('../app/models/user.server.model');
    // Return the Mongoose connection instance
    return db;
};
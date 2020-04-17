var medicalConditions = require('../../app/controllers/medicalCondition.server.controller');
var users = require('../../app/controllers/user.server.controller');

//Configure routes
module.exports = function (app) {
    
    app.route("/api/medicalConditions")
        .get(medicalConditions.list)
        .post(users.requiresLogin, users.isNurse, medicalConditions.create);
    
    // Get user, update user, delete user by id
	app.route('/api/medicalConditions/:medicalConditionId')
        .get(medicalConditions.read)
        .put(users.requiresLogin, users.isNurse, medicalConditions.update)
        .delete(users.requiresLogin, users.isNurse, medicalConditions.delete);

    // Add symptoms
    app.route('/api/medicalConditions/:medicalConditionId/symptoms')
        .post(medicalConditions.setSymptoms);
};


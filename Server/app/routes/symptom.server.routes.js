var symptoms = require('../../app/controllers/symptom.server.controller');
var users = require('../../app/controllers/user.server.controller');

//Configure routes
module.exports = function (app) {
    
    app.route("/api/symptoms")
        .get(symptoms.list)
        .post(users.requiresLogin, users.isNurse, symptoms.create);
    
	app.route('/api/symptoms/:symptomId')
        .get(symptoms.read)
        .put(users.requiresLogin, users.isNurse, symptoms.update)
        .delete(users.requiresLogin, users.isNurse, symptoms.delete);
};


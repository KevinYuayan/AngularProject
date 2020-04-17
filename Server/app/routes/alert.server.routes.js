var alerts = require('../controllers/alert.server.controller.js');
var users = require('../controllers/user.server.controller.js');

//Configure routes
module.exports = function (app) {
    
    app.route("/api/alerts")
        .get( alerts.list)
        .post(users.requiresLogin, users.isPatient, alerts.create);
    
	app.route('/api/alerts/:alertId')
        .get(alerts.read)
        .put(users.requiresLogin, users.hasAuthorization, alerts.update)
        .delete(users.requiresLogin, users.hasAuthorization, alerts.delete);

        app.route('/api/patient/alerts')
        .get(users.requiresLogin, alerts.patientList);
};


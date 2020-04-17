var records = require('../../app/controllers/record.server.controller');
var users = require('../../app/controllers/user.server.controller');

//Configure routes
module.exports = function (app) {
    
    app.route("/api/records")
        .get(users.requiresLogin, records.list)
        .post(users.requiresLogin, users.isNurse, records.create);
    
        app.route('/api/records/:recordId')
        .get(users.requiresLogin, records.read)
        .put(users.requiresLogin, users.isNurse, records.update)
        .delete(users.requiresLogin, users.isNurse, records.delete);

        app.route('/api/patient/records')
        .get(users.requiresLogin, records.patientList)
        .post(users.requiresLogin, records.patientCreate);
};


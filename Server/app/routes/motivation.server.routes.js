var motivations = require('../../app/controllers/motivation.server.controller');
var users = require('../../app/controllers/user.server.controller');

//Configure routes
module.exports = function (app) {
    
    app.route("/api/motivations")
        .get(motivations.list)
        .post(users.requiresLogin, users.isNurse, motivations.create);
    
	app.route('/api/motivations/:motivationId')
        .get(motivations.read)
        .put(users.requiresLogin, users.isNurse, motivations.update)
        .delete(users.requiresLogin, users.isNurse, motivations.delete);
};


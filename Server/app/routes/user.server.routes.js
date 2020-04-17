var users = require('../../app/controllers/user.server.controller');

//Configure routes
module.exports = function (app) {
    
    // Get all users, create users
    app.route("/api/users")
        .get(users.requiresLogin, users.list)
        .post(users.create);
    
    // Get user, update user, delete user by id
	app.route('/api/users/:userId')
        .get(users.read)
        .put(users.requiresLogin, users.hasAuthorization, users.update)
        .delete(users.delete)

    // Login
    app.post('/api/signin', users.authenticate);

    // Logout
    app.get('/api/signout', users.signout);

    // Check signed in
    app.get('/api/read_cookie', users.isSignedIn);

    // path to a protected page
	app.get('/api/welcome', users.welcome);
    
    app.get('/api/patients', users.patients);

    // Configure parameter for userById middleware
    app.param('userId', users.userById);
};


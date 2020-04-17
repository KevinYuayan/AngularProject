const User = require('mongoose').model('User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 3600;
const jwtKey = config.secretKey;

exports.create = function (req, res, next) {

	var user = new User(req.body);
	if(req.body.isNurse){
		user.role = "Nurse";
	} else {
		user.role = "Patient";
	}
    user.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Success
            res.json(user);
        }
    });
};

exports.list = function (req, res, next) {
	console.log("Getting users");
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
			
            res.json(users);
        }
    });
};

exports.userById = function (req, res, next, id) {
	User.findOne({
        _id: id
	}, (err, user) => {
		if (err) {
			return next(err);
		} else {
            req.user = user;
			next();
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(user);
    });
};

exports.delete = function(req, res, next) {
    User.findByIdAndRemove(req.user.id, req.body, function (err, user) {
      if (err) return next(err);
      res.json(user);
    });
};

exports.authenticate = function(req, res, next) {
	const username = req.body.username;
	const password  = req.body.password;
	
	User.findOne({username: username}, (err, user) => {
			if (err) {
				return next(err);
			} else {
			if(!user){
				return res.status(404).end()
			}
			//compare passwords	
			if(bcrypt.compareSync(password, user.password)) {
				// Create a new token for the user, token remains valid for 10 minutes
				const token = jwt.sign({ 
					id: user._id, 
					name: user.firstName + ' ' + user.lastName,
					username: user.username,
					currentRole: user.role
				}, jwtKey, {
					algorithm: 'HS256', 
					expiresIn: jwtExpirySeconds 
				});
				
				// set the cookie as the token string, with a similar max age as the token
				// here, the max age is in milliseconds
				// res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				res.status(200).send({ username: user.username, role: user.role, token: token });
				
				req.user=user;

				//call the next middleware
				next()
			} else {
				res.json({status:"error", message: "Invalid username or password!!!",
				data:null});
			}
			
		}
		
	});
};

exports.welcome = (req, res) => {
	const token = req.cookies.token.split(' ')[1];

	if (!token) {
	  return res.status(401).end()
	}
  
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, return the welcome message to the user, along with their
	// username given in the token
	// use back-quotes here
	res.send(`${payload.username}`)
 };
 
// Clear token on signout
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
}

//check if the user is signed in
exports.isSignedIn = (req, res) => {
	// Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token;

	if (!token) {
	  return res.send({ error: 'authencation required' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, token is ok, return the username given in the token
	res.status(200).send({ username: payload.username, token: token });
}

exports.patients = function(req, res, next) {
	User.find({role: 'Patient'}, function (err, users) {
        if (err) {
            return next(err);
        } else {
			
            res.json(users);
        }
    });
}

//isAuthenticated() method to check whether a user is currently authenticated
exports.requiresLogin = function (req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	
	if(!req.headers.authorization){
		return res.send({ error: 'No token found' }).end();
	}

	var token = req.headers.authorization.split(' ')[1];

	if (!token) {
	  return res.send({ error: 'Authentication required' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	  console.log('in requiresLogin - payload:',payload)
	  req.id = payload.id;
	  req.currentRole = payload.currentRole;
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		console.log(token);
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
	// user is authenticated
	//call next function in line
    next();
};

// To make sure current user is the one whom this belongs to
exports.hasAuthorization = function (req, res, next) {
    if (req.user.id !== req.id) {
        return res.status(403).send({
            message: 'Unauthorized access is prohibited'
        });
    }
    next();
};

exports.isNurse = function(req, res, next) {
	if(req.currentRole != 'Nurse') {
		return res.status(403).send({
            message: 'This operation can only be performed by a nurse'
        }); 
	}
	next();
}

exports.isPatient = function(req, res, next) {
	if(req.currentRole != 'Patient') {
		return res.status(403).send({
            message: 'This operation can only be performed by a patient'
        }); 
	}
	next();
}
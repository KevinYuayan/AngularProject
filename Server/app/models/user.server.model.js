const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

const Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		validate: [
			(password) => password && password.length >= 8,
			'Password must have at least 8 characters'
		]
	},
    firstName: String,
	lastName: String,
	role: String
});

// Password encryption middleware
UserSchema.pre('save', function(next){
	var salt = bcrypt.genSaltSync(saltRounds);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

UserSchema.methods.authenticate = function(password) {
	//Hash the provided password, and match the hashes
	var salt = bcrypt.genSaltSync(saltRounds);
	return this.password === bcrypt.hashSync(password, salt);
};

UserSchema.set('toJSON', {
	getters: true
});

mongoose.model('User', UserSchema);
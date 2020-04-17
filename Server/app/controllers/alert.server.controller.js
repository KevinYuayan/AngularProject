const Alert = require('mongoose').model('Alert');

exports.create = function (req, res, next) {

    if(!req.id){
        res.json({message: "Invalid token, no id found"}).end();
    }

    var alert = new Alert(req.body);
    alert.patient = req.id;
    Alert.create(
        alert,
        function (err) {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Success
                res.json(alert);
            }
        }
    );
}

exports.list = function (req, res, next) {
    Alert.find({}, function (err, alerts) {
        if (err) {
            return next(err);
        } else {
            res.json(alerts);
        }
    })
    .populate('patient');
}

exports.patientList = function (req, res, next) {
    Alert.find({patient: req.id}, function (err, alerts) {
        if (err) {
            return next(err);
        } else {
            res.json(alerts);
        }
    })
    .populate('patient');
}

exports.read = function (req, res, next) {
    var id = req.params.alertId;
    Alert.findById(
        id
	, (err, alert) => {
		if (err) {
			return next(err);
		} else {
            res.json(alert);
		}
	});
}

exports.update = function (req, res, next) {
    var id = req.params.alertId;
    var alert = req.body.alert;
    Alert.findByIdAndUpdate(
        id,
        alert,
	    (err, alert) => {
		if (err) {
			return next(err);
		} else {
            res.json(alert);
		}
	});
}

exports.delete = function (req, res, next) {
    var id = req.params.alertId;
    Alert.findByIdAndUpdate(
        id,
	    (err, alert) => {
		if (err) {
			return next(err);
		} else {
            res.json(alert);
		}
	});
}
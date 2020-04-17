const Symptom = require('mongoose').model('Symptom');

exports.create = function (req, res, next) {
    var symptom = new Symptom(req.body);
    Symptom.create(
        symptom,
        function (err) {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Success
                res.json(symptom);
            }
        }
    );
}

exports.list = function (req, res, next) {
    Symptom.find({}, function (err, symptoms) {
        if (err) {
            return next(err);
        } else {
            res.json(symptoms);
        }
    });
}

exports.read = function (req, res, next) {
    var id = req.params.alertId;
    Symptom.findById(
        id
	, (err, symptom) => {
		if (err) {
			return next(err);
		} else {
            res.json(symptom);
		}
	});
}

exports.update = function (req, res, next) {
    var id = req.params.alertId;
    var symptom = req.body.symptom;
    Symptom.findByIdAndUpdate(
        id,
        symptom,
	    (err, symptom) => {
		if (err) {
			return next(err);
		} else {
            res.json(symptom);
		}
	});
}

exports.delete = function (req, res, next) {
    var id = req.params.alertId;
    Symptom.findByIdAndUpdate(
        id,
	    (err, symptom) => {
		if (err) {
			return next(err);
		} else {
            res.json(symptom);
		}
	});
}
const Motivation = require('mongoose').model('Motivation');

exports.create = function (req, res, next) {
    var motivation = new Motivation(req.body);
    Motivation.create(
        motivation,
        function (err) {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Success
                res.json(motivation);
            }
        }
    );
}

exports.list = function (req, res, next) {
    Motivation.find({}, function (err, motivations) {
        if (err) {
            return next(err);
        } else {
            res.json(motivations);
        }
    });
}

exports.read = function (req, res, next) {
    var id = req.params.alertId;
    Motivation.findById(
        id
	, (err, motivation) => {
		if (err) {
			return next(err);
		} else {
            res.json(motivation);
		}
	});
}

exports.update = function (req, res, next) {
    var id = req.params.alertId;
    var motivation = req.body.motivation;
    Motivation.findByIdAndUpdate(
        id,
        motivation,
	    (err, motivation) => {
		if (err) {
			return next(err);
		} else {
            res.json(motivation);
		}
	});
}

exports.delete = function (req, res, next) {
    var id = req.params.alertId;
    Motivation.findByIdAndUpdate(
        id,
	    (err, motivation) => {
		if (err) {
			return next(err);
		} else {
            res.json(motivation);
		}
	});
}
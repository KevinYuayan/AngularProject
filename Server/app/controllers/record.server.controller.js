const Record = require('mongoose').model('Record');

exports.create = function (req, res, next) {
    var record = new Record(req.body);
    Record.create(
        record,
        function (err) {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Success
                res.json(record);
            }
        }
    );
}

exports.patientCreate = function (req, res, next) {
    
    if(!req.id){
        res.json({message: "Id not found for the user"}).end();
    }

    var record = new Record(req.body);
    record.patient = req.id;
    Record.create(
        record,
        function (err) {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Success
                res.json(record);
            }
        }
    );
}

exports.list = function (req, res, next) {
    
    Record.find({}, function (err, records) {
        if (err) {
            return next(err);
        } else {
            res.json(records);
        }
    });
}

exports.patientList = function(req, res, next) {
    if(!req.id){
        res.json({message: "Invalid token"}).end();
    }

    Record.find({ patient: req.id}, function (err, records) {
        if (err) {
            console.log("not found");
            return next(err);
        } else {
            res.json(records);
        }
    });
}

exports.read = function (req, res, next) {
    var id = req.params.alertId;
    Record.findById(
        id
	, (err, record) => {
		if (err) {
			return next(err);
		} else {
            res.json(record);
		}
	});
}

exports.update = function (req, res, next) {
    var id = req.params.alertId;
    var record = req.body.record;
    Record.findByIdAndUpdate(
        id,
        record,
	    (err, record) => {
		if (err) {
			return next(err);
		} else {
            res.json(record);
		}
	});
}

exports.delete = function (req, res, next) {
    var id = req.params.alertId;
    Record.findByIdAndUpdate(
        id,
	    (err, record) => {
		if (err) {
			return next(err);
		} else {
            res.json(record);
		}
	});
}
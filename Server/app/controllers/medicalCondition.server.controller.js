const MedicalCondition = require('mongoose').model('MedicalCondition');
const Symptom = require('mongoose').model('Symptom');

exports.create = function (req, res, next) {
    var medicalCondition = new MedicalCondition(req.body);
    MedicalCondition.create(
        medicalCondition,
        function (err) {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Success
                res.json(medicalCondition);
            }
        }
    );
}

exports.list = function (req, res, next) {
    MedicalCondition.find({}, function (err, medicalConditions) {
        if (err) {
            return next(err);
        } else {
            res.json(medicalConditions);
        }
    });
}

exports.read = function (req, res, next) {
    var id = req.params.alertId;
    MedicalCondition.findById(
        id
	, (err, medicalCondition) => {
		if (err) {
			return next(err);
		} else {
            res.json(medicalCondition);
		}
	});
}

exports.update = function (req, res, next) {
    var id = req.params.alertId;
    var medicalCondition = req.body.medicalCondition;
    MedicalCondition.findByIdAndUpdate(
        id,
        medicalCondition,
	    (err, medicalCondition) => {
		if (err) {
			return next(err);
		} else {
            res.json(medicalCondition);
		}
	});
}

exports.delete = function (req, res, next) {
    var id = req.params.alertId;
    MedicalCondition.findByIdAndUpdate(
        id,
	    (err, medicalCondition) => {
		if (err) {
			return next(err);
		} else {
            res.json(medicalCondition);
		}
	});
}

exports.setSymptoms = function (req, res, next) {
    var id = req.params.alertId;
    var symptomIds = req.body.symptomIds;

    MedicalCondition.findById(
        id
	, (err, medicalCondition) => {
		if (err) {
			return next(err);
		} else {
            medicalCondition.symptoms = symptomIds;
            MedicalCondition.updateOne(medicalCondition.id, medicalCondition, (err, updated) => {
                if(err){
                    return next(err);
                }
                else{
                    res.json(updated);
                }
            });
		}
	});
}
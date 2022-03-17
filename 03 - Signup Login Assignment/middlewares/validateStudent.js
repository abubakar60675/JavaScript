const StudentModel = require("../models/StudentModel");
module.exports = function(req, res, next) {
    let { error } = StudentModel.validateStudent(req.body);
    if (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
    next();
};
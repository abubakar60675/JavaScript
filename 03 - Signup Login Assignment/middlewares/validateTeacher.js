const TeacherModel = require("../models/TeacherModel");
module.exports = function(req, res, next) {
    let { error } = TeacherModel.validateTeacher(req.body);
    if (error) {
        console.log(error);
        return res.status(401).send(error.message);
    }
    next();
};
const Joi = require("joi");
const mongoose = require("mongoose");

var teacherSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: { type: String, lowercase: true },
    password: String,
    role: { type: String, default: "Normal" },

});

teacherSchema.validateTeacher = (data) => {
    let joischema = Joi.object({
        name: Joi.string().min(3).max(10),
        password: Joi.string().min(8).max(20),
        email: Joi.string().email(),
        age: Joi.number().min(0),
    });
    return joischema.validate(data, { abortEarly: false });
};

var TeacherModel = mongoose.model("Teacher", teacherSchema);
module.exports = TeacherModel;
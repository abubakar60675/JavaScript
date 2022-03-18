var express = require("express");
var router = express.Router();
const TeacherModel = require("../../models/TeacherModel");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/signup", async function(req, res) {
    try {
        let result = await TeacherModel.findOne({ email: req.body.email });
        if (result) return res.status(400).send("Teacher with given Email already exists");
        result = new TeacherModel();
        result.name = req.body.name;
        result.email = req.body.email;
        let salt = await bcrypt.genSalt(10);
        result.password = await bcrypt.hash(req.body.password, salt);
        result = await result.save();
        result = _.pick(result, ["name", "age", "email", "_id"]);
        return res.send(result);
    } catch (err) {
        return res.status(401).send(err.message);
    }
});
router.get("/signin", async(req, res) => {
    try {

        let { email, password } = req.body;

        let result = await TeacherModel.findOne({ email: email });
        if (!result) {
            return res.status(404).send("User with given email was not found");
        }

        let isValid = await bcrypt.compare(password, result.password);
        if (!isValid) return res.status(404).send("Invalid Password");
        let token = jwt.sign({ _id: result._id, name: result.name }, config.get("jwtPrivateKey"));
        return res.send(token);

        // result = _.pick(result, ["name", "age", "email", "_id"]);
        // return res.send(result);
    } catch (err) {
        return res.status(401).send(err.message);
    }
});




router.get("/", async function(req, res) {
    try {

        let page = Number(req.query.page);
        let perPage = Number(req.query.perPage);

        page = (page - 1) * perPage;


        let result = await TeacherModel.find(req.body).skip(page).limit(perPage);

        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
    }
});

router.get("/:id", async function(req, res) {
    try {
        let result = await TeacherModel.findById(req.params.id);
        if (!result) {
            return res.status(400).send("Teacher with given ID not found");
        }
        return res.send(result);
    } catch (err) {
        console.log(err);

        return res.status(400).send("The format of id is not correct");
    }
});

router.put("/:id", async function(req, res) {
    try {
        let result = await TeacherModel.findById(req.params.id);
        if (!result) {
            return res.status(400).send("The record with given id was not found");
        }

        result = await TeacherModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
    }
});

router.delete("/:id", async function(req, res) {
    try {
        let result = await TeacherModel.findById(req.params.id);
        if (!result) {
            return res.status(400).send("record with given ID not found");
        }
        result = await TeacherModel.findByIdAndDelete(req.params.id);
        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
    }
});


module.exports = router;
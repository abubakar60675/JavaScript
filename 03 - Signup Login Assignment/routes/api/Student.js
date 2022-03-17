var express = require("express");
var router = express.Router();
const StudentModel = require("../../models/StudentModel");
const bcrypt = require("bcryptjs");
const _ = require("lodash");



router.get("/signup", async function(req, res) {
    try {
        let result = new StudentModel();
        result.name = req.body.name;
        result.email = req.body.email;
        let salt = await bcrypt.genSalt(10);
        result.password = await bcrypt.hash(req.body.password, salt);
        result = await result.save();
        result = _.pick(result, ["name", "age", "email", "_id"]);
        res.send(result);
    } catch (err) {
        res.status(401).send(err.message);
    }
});
router.get("/signin", async(req, res) => {
    try {

        let { email, password } = req.body;

        let result = await StudentModel.findOne({ email: email });
        if (!result) {
            res.status(404).send("User with given email was not found");
        }

        let isValid = await bcrypt.compare(password, result.password);
        if (!isValid) {
            res.status(404).send("Invalid Password");
        }

        result = _.pick(result, ["name", "age", "email", "_id"]);

        res.send(result);
    } catch (err) {
        res.status(401).send(err.message);
    }
});



router.get("/", async function(req, res) {
    try {

        let page = Number(req.query.page);
        let perPage = Number(req.query.perPage);

        page = (page - 1) * perPage;

        let result = await StudentModel.find(req.body).skip(page).limit(perPage);

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get("/:id", async function(req, res) {
    try {
        let result = await StudentModel.findById(req.params.id);
        if (!result) {
            res.status(400).send("Student with given ID not found");
        }
        res.send(result);
    } catch (err) {
        console.log(err);

        res.status(400).send("The format of id is not correct");
    }
});

router.put("/:id", async function(req, res) {
    try {
        let result = await StudentModel.findById(req.params.id);
        if (!result) {
            res.status(400).send("The record with given id was not found");
        }

        result = await StudentModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});
router.delete("/:id", async function(req, res) {
    try {
        let result = await StudentModel.findById(req.params.id);
        if (!result) {
            res.status(400).send("record with given ID not found");
        }
        result = await StudentModel.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);

    }
});

module.exports = router;
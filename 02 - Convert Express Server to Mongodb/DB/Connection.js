const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/isdp").then(() => {
    console.log("Connected Successfully");
}).catch((error) => {
    console.log("Not Connected");
    console.log(error);
})
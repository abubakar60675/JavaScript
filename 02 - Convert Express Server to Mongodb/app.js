const express = require("express");
require("./DB/Connection");
const router = require("./Routers/ProductCrud");
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(router);
app.listen(port, () => {
    console.log(`Connection is live on port no. ${port}`)
})
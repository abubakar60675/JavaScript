const express = require("express");
const router = new express.Router();
const ProductModel = require("../Models/ProductModel");

// *****Creat Product*****
router.post("/products", async(req, res) => {
    try {
        const createProduct = new ProductModel(req.body)
        console.log(req.body);
        let creat = await createProduct.save();
        res.status(201).send(creat);
    } catch (error) {
        res.status(400).send(error);
    }
})

// *****Get All Products*****
router.get("/products", async(req, res) => {
    try {
        const getAllProducts = await ProductModel.find({});


        res.send(getAllProducts);
    } catch (error) {
        res.status(400).send(error);
    }
})

// *****Get One Product*****
router.get("/products/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const getSingalProduct = await ProductModel.findById(_id);
        res.send(getSingalProduct);
    } catch (error) {
        res.status(400).send(error);
    }
})

// *****Update product*****
router.patch("/products/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const getSingalProduct = await ProductModel.findByIdAndUpdate(_id, req.body, { new: true });
        res.send(getSingalProduct);
    } catch (error) {
        res.status(500).send(error);
    }
})

// *****Delete product*****
router.delete("/products/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const getSingalProduct = await ProductModel.findByIdAndDelete(_id);
        res.send(getSingalProduct);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
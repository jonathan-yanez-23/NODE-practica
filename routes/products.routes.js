const express = require("express");
const router = express.Router();
const Product = require("../models/Product");



router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
});



router.get("/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if(product){
            return res.status(200).json(product);
        } else {
            return res.status(404).json("No product found by this id");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.post("/create", async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image
        });

        // guardar en DB
        const createdProduct= await newProduct.save();
        return res.status(200).json(createdProduct);
    } catch (err) {
        
    }
})

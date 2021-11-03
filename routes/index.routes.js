const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


router.get("/", async(req, res, next) => {
    try {
        res.status(200).render("index");
    } catch (err) {
        next(err);
    }
});

router.get("/products", async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).render("products", {products})
    } catch (err) {
        next(err);
    }
});

router.get("/login", (req, res, next) => {
    res.render("login");
});
module.exports = router;
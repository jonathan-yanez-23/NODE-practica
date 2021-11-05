const express = require("express");
const router = express.Router();
const Product = require("../models/Product");



router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(400).json(err);
    }
});



router.get("/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if(product){
            return res.status(200).json(product);
        } else {
            return res.status(400).json("No product found by this id");
        }
    } catch (err) {
        next(err);
    }
});


/*
Filtra productos por nombre. Lo hace por nombre exacto (exact match).
Si en mongodb no hay ningun producto que tenga ese nombre, devuelve un array vacio
Si en hay un producto con ese nombre, se devuelve en un array (por si hay mas productos)
Si ocurre un error con las base de datos, se lanza un error
*/
router.get("/filter/:name", async(req, res) => {
    const filterStr = req.params.name;
    
    try {
        const products = await Product.find(
            {"name": {"$regex": filterStr, "$options":"1"}}
        );
        if(products){
            return res.status(200).json(products);
        } else {
            return res.status(400).json("Undefined products");
        }
    } catch (error) {
        next(error);
    }
});


/** Crea un producto nuevo, cada producto debe tener un nombre diferente, por tanto
 * este se configura desde esta parte. 
 * Si se quiere editar el producto, se hace con una peticion PUT
 */
router.post("/create", async (req, res) => {
    try {
        // Buscar producto por el mismo nombre, si existe, se devuelve el mismo producto
        const previousProduct = await Product.findOne(
            {
                name: req.body.name
            }
        );
        if(previousProduct){
            return res.status(200).json(previousProduct);
        }
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
        next(err)   
    }
});

module.exports = router;
const mongoose = require("mongoose");
const { float } = require("webidl-conversions");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true },
        image: {type: String, required: true} // Sera una URL o una ruta hacia una imagen dentro del servidor
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports =Product
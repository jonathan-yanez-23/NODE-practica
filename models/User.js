const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos el esquema de User
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        cart: [{type: mongoose.Types.ObjectId, ref: "Product"}]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;